import { connectDb } from "@/lib/db";
import { extractFromToken, throwApiError } from "@/lib/utils";
import { User, WorkExperience, Project } from "@/models";
import { UpdateProfileRequest } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export const PUT = async (req: NextRequest) => {
  try {
    await connectDb();
    const userId = extractFromToken(req);
    if (userId instanceof NextResponse) return userId;

    const updateData: UpdateProfileRequest = await req.json();

    const { workExperiences, projects, onboarded, ...userUpdateFields } =
      updateData;

    const updateObj: any = {};
    if (userUpdateFields.fullname !== undefined)
      updateObj.fullname = userUpdateFields.fullname;
    if (userUpdateFields.age !== undefined)
      updateObj.age = Number(userUpdateFields.age);
    if (userUpdateFields.introduction !== undefined)
      updateObj.introduction = userUpdateFields.introduction;
    if (userUpdateFields.roles !== undefined)
      updateObj.roles = userUpdateFields.roles;
    if (userUpdateFields.skills !== undefined)
      updateObj.skills = userUpdateFields.skills;
    if (userUpdateFields.githubUrl !== undefined)
      updateObj.githubUrl = userUpdateFields.githubUrl;
    if (userUpdateFields.portfolioUrl !== undefined)
      updateObj.portfolioUrl = userUpdateFields.portfolioUrl;
    if (userUpdateFields.linkedinUrl !== undefined)
      updateObj.linkedinUrl = userUpdateFields.linkedinUrl;
    if (userUpdateFields.otherLinks !== undefined)
      updateObj.otherLinks = userUpdateFields.otherLinks;
    if (userUpdateFields.writingStyle !== undefined)
      updateObj.writingStyle = userUpdateFields.writingStyle;
    if (userUpdateFields.sampleProposal !== undefined)
      updateObj.sampleProposal = userUpdateFields.sampleProposal;
    if (onboarded !== undefined) updateObj.onboarded = onboarded;

    const dbOperations: Promise<any>[] = [];

    if (Object.keys(updateObj).length > 0) {
      dbOperations.push(
        User.findByIdAndUpdate(userId, updateObj, { new: true })
      );
    }

    if (workExperiences !== undefined) {
      const existingWorkExps = await WorkExperience.find({ userId });
      const existingWorkExpIds = existingWorkExps.map((exp) =>
        exp._id.toString()
      );

      const incomingWorkExpIds = workExperiences
        .map((exp) => exp._id)
        .filter(
          (id): id is string =>
            id !== undefined && mongoose.Types.ObjectId.isValid(id)
        )
        .map((id) => id.toString());

      const workExpIdsToDelete = existingWorkExpIds.filter(
        (id) => !incomingWorkExpIds.includes(id)
      );

      if (workExpIdsToDelete.length > 0) {
        dbOperations.push(
          WorkExperience.deleteMany({
            _id: {
              $in: workExpIdsToDelete.map(
                (id) => new mongoose.Types.ObjectId(id)
              ),
            },
            userId,
          })
        );
      }

      if (workExperiences.length > 0) {
        const workExpPromises = workExperiences.map(async (exp) => {
          const workExpData = {
            userId,
            jobTitle: exp.jobTitle,
            description: exp.description,
            startDate: exp.startDate,
            endDate: exp.endDate,
            ongoing: exp.ongoing,
            skills: exp.skills,
          };

          if (exp._id && mongoose.Types.ObjectId.isValid(exp._id)) {
            const existingExp = await WorkExperience.findOne({
              _id: exp._id,
              userId,
            });
            if (existingExp) {
              return WorkExperience.findByIdAndUpdate(exp._id, workExpData, {
                new: true,
              });
            } else throw new Error("Work experience not found or unauthorized");
          } else {
            return WorkExperience.create(workExpData);
          }
        });
        dbOperations.push(...workExpPromises);
      }
    }

    if (projects !== undefined) {
      const existingProjects = await Project.find({ userId });
      const existingProjectIds = existingProjects.map((project) =>
        project._id.toString()
      );

      const incomingProjectIds = projects
        .map((project) => project._id)
        .filter(
          (id): id is string =>
            id !== undefined && mongoose.Types.ObjectId.isValid(id)
        )
        .map((id) => id.toString());

      const projectIdsToDelete = existingProjectIds.filter(
        (id) => !incomingProjectIds.includes(id)
      );

      if (projectIdsToDelete.length > 0) {
        dbOperations.push(
          Project.deleteMany({
            _id: {
              $in: projectIdsToDelete.map(
                (id) => new mongoose.Types.ObjectId(id)
              ),
            },
            userId,
          })
        );
      }

      if (projects.length > 0) {
        const projectPromises = projects.map(async (project) => {
          const projectData = {
            userId,
            title: project.title,
            description: project.description,
            link: project.link,
          };

          if (project._id && mongoose.Types.ObjectId.isValid(project._id)) {
            const existingProject = await Project.findOne({
              _id: project._id,
              userId,
            });
            if (existingProject) {
              return Project.findByIdAndUpdate(project._id, projectData, {
                new: true,
              });
            } else {
              throw new Error("Project not found or unauthorized");
            }
          } else return Project.create(projectData);
        });
        dbOperations.push(...projectPromises);
      }
    }

    try {
      await Promise.all(dbOperations);
    } catch (error: any) {
      if (error.message?.includes("not found or unauthorized")) {
        return throwApiError(error.message, 404);
      }
      throw error;
    }

    const updatedUser = await User.findById(userId).select("-password");
    if (!updatedUser) return throwApiError("User not found", 404);

    const response = NextResponse.json(
      {
        message: "Profile updated successfully",
        success: true,
        user: updatedUser,
      },
      { status: 200 }
    );

    if (updatedUser.onboarded) {
      response.cookies.set("onboarded", "true", {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
      });
    }

    return response;
  } catch (err: any) {
    console.error("Error updating profile:", err);
    return throwApiError(err.message || "Internal Server Error", 500);
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectDb();
    const userId = extractFromToken(req);
    if (userId instanceof NextResponse) return userId;

    const [user, workExperiences, projects] = await Promise.all([
      User.findById(userId).select("-password"),
      WorkExperience.find({ userId }),
      Project.find({ userId }),
    ]);
    if (!user) return throwApiError("User not found", 404);

    return NextResponse.json(
      {
        message: "User profile fetched successfully",
        success: true,
        user: {
          ...user.toObject(),
          workExperiences,
          projects,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    return throwApiError("Internal Server Error", 500);
  }
};

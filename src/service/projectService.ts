import { PrismaClient } from "@prisma/client";
import { ProjectResponseDTO } from "../dto/response/ProjectResponseDTO";

const prisma = new PrismaClient();

const getProjectList = async (type: number) => {
    const getProjectList = await prisma.project.findMany({
        select: {
            title: true,
            members: true,
            type: true,
            photo: true,
            project_id: true,
        },
        where: {
            type: type,
        },
        orderBy: {
            order: "asc",
        },
    });

    const projectList = getProjectList.map((project) => {
        return {
            title: project.title,
            members: project.members,
            type: project.type,
            photo: project.photo,
            projectId: project.project_id,
        };
    });

    return projectList;
};

const getProject = async (projectId: number) => {
    const project = await prisma.project.findUnique({
        where: {
            project_id: projectId,
        },
        select: {
            project_id: true,
            title: true,
            members: true,
            desc: true,
            link: true,
            type: true,
            photos: true,
            team_name: true,
        },
    });

    const members = await prisma.member.findMany({
        where: {
            project_id: projectId,
        },
        select: {
            designer: {
                select: {
                    designer_id: true,
                    name_ko: true,
                    profile: true,
                    field: true,
                },
            },
        },
    });

    const projectResponseDTO: ProjectResponseDTO = {
        projectId: project?.project_id as number,
        title: project?.title as string,
        members: project?.members as string,
        desc: project?.desc as string,
        link: project?.link as string,
        photos: project?.photos as string[],
        teamName: project?.team_name as string,
        memberList: members.map((data: any) => {
            return {
                designerId: data.designer.designer_id,
                name: data.designer.name_ko,
                field: data.designer.field,
                profile: data.designer.profile,
            };
        }),
    };

    return projectResponseDTO;
};

const projectService = {
    getProjectList,
    getProject,
};

export default projectService;

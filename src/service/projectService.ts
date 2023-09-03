import { PrismaClient } from "@prisma/client";
import { ProjectResponseDTO } from "../dto/response/ProjectResponseDTO";

const prisma = new PrismaClient();

const getProjectList = async (type: number) => {
    const projectList = await prisma.project.findMany({
        select: {
            title: true,
            members: true,
            type: true,
            photo: true,
        },
        where: {
            type: type,
        },
        orderBy: {
            order: "asc",
        },
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
            photo: true,
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
        photo: project?.photo as string,
        memberList: members.map((data: any) => {
            return data.designer;
        }),
    };

    return projectResponseDTO;
};

const alarmService = {
    getProjectList,
    getProject,
};

export default alarmService;

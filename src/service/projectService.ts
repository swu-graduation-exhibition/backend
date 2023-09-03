import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * get user info by username
 *
 * @param {number} type type of project
 */
const getProjectList = async (type: number) => {
    const projectList = await prisma.project.findMany({
        select: {
            title: true,
            member: true,
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

    console.log(type);
    return projectList;
};

const alarmService = {
    getProjectList,
};

export default alarmService;

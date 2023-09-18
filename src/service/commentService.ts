import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";

const prisma = new PrismaClient();

const countDesginerComment = async (id: string) => {
    const count = await prisma.designer_comment.count({
        where: {
            designer_id: {
                in: [+id, 58],
            },
        },
    });

    return count;
};

const countProjectComment = async (id: number) => {
    const count = await prisma.designer_comment.count({
        where: {
            designer_id: {
                in: [id, 58],
            },
        },
    });

    return count;
};

const getDesignerComments = async (id: string, page: number) => {
    const concludeQuery =
        id === ""
            ? {}
            : {
                  designer_id: {
                      in: [+id, 58],
                  },
              };

    const desingerCommentList = await prisma.designer_comment.findMany({
        skip: 8 * (page - 1),
        take: 8,
        where: concludeQuery,
        select: {
            sender: true,
            content: true,
            created_at: true,
        },
        orderBy: {
            created_at: "desc",
        },
    });

    return desingerCommentList.map((data: any) => {
        let converted = {
            ...data,
            createdAt: data.created_at,
        };
        delete converted.created_at;
        return converted;
    });
};

const getProjectComments = async (id: number, page: number) => {
    const projectCommentList = await prisma.project_comment.findMany({
        skip: 8 * (page - 1),
        take: 8,
        where: {
            project_id: {
                in: [id, 58],
            },
        },
        select: {
            sender: true,
            content: true,
            created_at: true,
        },
        orderBy: {
            created_at: "desc",
        },
    });

    const projectList = projectCommentList.map((data: any) => {
        let converted = {
            ...data,
            createdAt: data.created_at,
        };

        delete converted.created_at;
        return converted;
    });

    return projectList;
};

const getDesignerCommentList = async (id: string, page: number) => {
    const [designerCommentList, count] = await Promise.all([
        await getDesignerComments(id, page),
        await countDesginerComment(id),
    ]);

    const result = {
        designerCommentList: designerCommentList,
        count: count,
    };

    return result;
};

const getProjectCommentList = async (id: number, page: number) => {
    const [projectCommentList, count] = await Promise.all([
        await getProjectComments(id, page),
        await countProjectComment(id),
    ]);

    const result = {
        projectCommentList: projectCommentList,
        count: count,
    };

    return result;
};

const createDesignerComment = async (sender: string, receiver: number, content: string) => {
    await prisma.designer_comment.create({
        data: {
            designer_id: receiver,
            content: content,
            sender: sender,
            created_at: dayjs().add(9, "hour").format(),
        },
    });
};

const createProjectComment = async (sender: string, receiver: number, content: string) => {
    await prisma.project_comment.create({
        data: {
            project_id: receiver,
            content: content,
            sender: sender,
            created_at: dayjs().add(9, "hour").format(),
        },
    });
};

const commentService = {
    getDesignerCommentList,
    getProjectCommentList,
    createDesignerComment,
    createProjectComment,
};

export default commentService;

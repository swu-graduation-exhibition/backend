import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";

const prisma = new PrismaClient();

const countDesginerComment = async (id: string, isSingle: boolean) => {
    const concludeQuery =
        id === ""
            ? {}
            : isSingle
            ? {
                  designer_id: {
                      in: [+id, 49],
                  },
              }
            : {
                  designer_id: +id,
              };

    const count = await prisma.designer_comment.count({
        where: concludeQuery,
    });

    return count;
};

const countProjectComment = async (id: number) => {
    const count = await prisma.project_comment.count({
        where: {
            project_id: id,
        },
    });

    return count;
};

const getDesignerComments = async (id: string, page: number, limit: number, isSingle: boolean) => {
    const concludeQuery =
        id === ""
            ? {}
            : isSingle
            ? {
                  designer_id: {
                      in: [+id, 49],
                  },
              }
            : {
                  designer_id: +id,
              };

    const desingerCommentList = await prisma.designer_comment.findMany({
        skip: limit * (page - 1),
        take: limit,
        where: concludeQuery,
        select: {
            sender: true,
            content: true,
            created_at: true,
            designer: {
                select: {
                    name_ko: true,
                },
            },
        },
        orderBy: {
            created_at: "desc",
        },
    });

    console.log("ESTSET" + desingerCommentList.length);

    return desingerCommentList.map((data: any) => {
        let converted = {
            ...data,
            receiver: data.designer.name_ko,
            createdAt: data.created_at,
        };
        delete converted.created_at;
        delete converted.designer;
        return converted;
    });
};

const getProjectComments = async (id: number, page: number, limit: number) => {
    const projectCommentList = await prisma.project_comment.findMany({
        skip: limit * (page - 1),
        take: limit,
        where: {
            project_id: id,
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

const getDesignerCommentList = async (id: string, page: number, limit: number) => {
    const [designerCommentList, count] = await Promise.all([
        await getDesignerComments(id, page, limit, true),
        await countDesginerComment(id, true),
    ]);

    const result = {
        designerCommentList: designerCommentList,
        count: count,
    };

    return result;
};

const getProjectCommentList = async (id: number, page: number, limit: number) => {
    const [projectCommentList, count] = await Promise.all([
        await getProjectComments(id, page, limit),
        await countProjectComment(id),
    ]);

    const result = {
        projectCommentList: projectCommentList,
        count: count,
    };

    return result;
};

const getCommentList = async (id: string, page: number, limit: number) => {
    const [commentList, count] = await Promise.all([
        await getDesignerComments(id, page, limit, false),
        await countDesginerComment(id, false),
    ]);

    const result = {
        commentList: commentList,
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
    getCommentList,
    createDesignerComment,
    createProjectComment,
};

export default commentService;

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getDesignerCommentList = async (id: string, page: number) => {
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

    console.log(desingerCommentList);
    const result = desingerCommentList.map((data: any) => {
        let converted = {
            ...data,
            createdAt: data.created_at,
        };
        delete converted.created_at;
        return converted;
    });

    return result;
};

const getProjectCommentList = async (id: number, page: number) => {
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

    const result = projectCommentList.map((data: any) => {
        let converted = {
            ...data,
            createdAt: data.created_at,
        };

        delete converted.created_at;
        return converted;
    });

    return result;
};

const commentService = {
    getDesignerCommentList,
    getProjectCommentList,
};

export default commentService;

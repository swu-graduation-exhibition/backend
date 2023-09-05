import { PrismaClient } from "@prisma/client";
import { DesignerResponseDTO } from "../dto/response/DesignerResponseDTO";

const prisma = new PrismaClient();

const getDesignerList = async () => {
    const desingerList = await prisma.designer.findMany({
        select: {
            designer_id: true,
            name_ko: true,
            field: true,
            profile: true,
        },
    });

    let sortedList = desingerList.sort((a: any, b: any) => a.name_ko[0] - b.name_ko[0]);

    const filteredList = sortedList.filter((data) => data.name_ko !== "모두에게");

    return filteredList;
};

const getDesigner = async (designerId: number) => {
    const designer = await prisma.designer.findUnique({
        where: {
            designer_id: designerId,
        },
        select: {
            designer_id: true,
            profile: true,
            name_ko: true,
            name_eng: true,
            desc: true,
            tel: true,
            email: true,
            instagram: true,
            behance: true,
        },
    });

    const projects = await prisma.member.findMany({
        where: {
            designer_id: designerId,
        },
        select: {
            project: {
                select: {
                    project_id: true,
                    title: true,
                    photo: true,
                    type: true,
                },
            },
        },
    });

    const designerResponseDTO: DesignerResponseDTO = {
        designerId: designer?.designer_id as number,
        profile: designer?.profile as string,
        koreanName: designer?.name_ko as string,
        englishName: designer?.name_eng as string,
        desc: designer?.desc as string,
        tel: designer?.tel as string,
        email: designer?.email as string,
        instagram: designer?.instagram as string,
        behance: designer?.behance as string,
        projectList: projects.map((data: any) => {
            return {
                projectId: data.project.project_id,
                photo: data.project.photo,
                title: data.project.title,
                type: data.project.type,
            };
        }),
    };

    return designerResponseDTO;
};

const designerService = {
    getDesignerList,
    getDesigner,
};

export default designerService;

export interface DesignerResponseDTO {
    designerId: number;
    profile: string;
    koreanName: string;
    englishName: string;
    desc: string;
    email: string;
    instagram: string;
    behance: string;
    projectList: DesignerResponseVO[];
}

interface DesignerResponseVO {
    projectId: number;
    photo: string;
    title: string;
    type: string;
}

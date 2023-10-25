export interface ProjectResponseDTO {
    projectId: number;
    title: string;
    members: string;
    desc: string;
    link: string;
    photos: string[];
    memberList: ProjectResponseVO[];
}

interface ProjectResponseVO {
    designerId: number;
    name: string;
    field: string;
    profile: string;
}

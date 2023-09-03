export interface ProjectResponseDTO {
    projectId: number;
    title: string;
    members: string;
    desc: string;
    link: string;
    photo: string;
    memberList: ProjectResponseVO[];
}

interface ProjectResponseVO {
    name: string;
    type: string;
    profile: string;
}

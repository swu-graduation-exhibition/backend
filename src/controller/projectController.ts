import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { SwuIdException } from "../models/SwuException";
import { rm, sc } from "../constants";
import { fail, success } from "../constants/response";
import { projectService } from "../service";

const list = async (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return next(new SwuIdException(sc.BAD_REQUEST, false, rm.BAD_REQUEST));
    }

    const { type } = req.query;

    if (!type) {
        return next(new SwuIdException(sc.BAD_REQUEST, false, rm.BAD_REQUEST));
    }

    try {
        const projectList = await projectService.getProjectList(+type);
        return res.status(sc.OK).send(success(sc.OK, rm.GET_PROJECT_LIST_SUCCESS, projectList));
    } catch (e) {
        return next(e);
    }
};

const single = async (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return next(new SwuIdException(sc.BAD_REQUEST, false, rm.BAD_REQUEST));
    }

    const { projectId } = req.params;

    if (!projectId) {
        return next(new SwuIdException(sc.BAD_REQUEST, false, rm.BAD_REQUEST));
    }

    try {
        const project = await projectService.getProject(+projectId);
        return res.status(sc.OK).send(success(sc.OK, rm.GET_PROJECT_SUCCESS, project));
    } catch (e) {
        return next(e);
    }
};

const projectController = {
    list,
    single,
};

export default projectController;

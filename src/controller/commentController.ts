import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { SwuIdException } from "../models/SwuException";
import { rm, sc } from "../constants";
import { fail, success } from "../constants/response";
import { commentService } from "../service";

const getDesignerComment = async (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return next(new SwuIdException(sc.BAD_REQUEST, false, rm.BAD_REQUEST));
    }

    let id = req.query.id as string;
    let page = req.query.page as string;

    if (!page) {
        return next(new SwuIdException(sc.BAD_REQUEST, false, rm.BAD_REQUEST));
    }

    if (!id) {
        id = "";
    }

    try {
        const commentList = await commentService.getDesignerCommentList(id, +page);
        return res.status(sc.OK).send(success(sc.OK, rm.GET_PROJECT_LIST_SUCCESS, commentList));
    } catch (e) {
        return next(e);
    }
};

const getProjectComment = async (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return next(new SwuIdException(sc.BAD_REQUEST, false, rm.BAD_REQUEST));
    }

    const { id, page } = req.query;

    if (!id || !page) {
        return next(new SwuIdException(sc.BAD_REQUEST, false, rm.BAD_REQUEST));
    }

    try {
        const commentList = await commentService.getProjectCommentList(+id, +page);
        return res.status(sc.OK).send(success(sc.OK, rm.GET_PROJECT_SUCCESS, commentList));
    } catch (e) {
        return next(e);
    }
};

const commentController = {
    getDesignerComment,
    getProjectComment,
};

export default commentController;

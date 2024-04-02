import Joi, { ValidationError } from 'joi';
import { Response } from "express"
import { AuthenticatedRequest } from '../../interfaces/AuthenticatedRequest';
import { INewPostParams } from '../../interfaces/IPost';
import { MAX_POST_SUMMARY_LENGTH_IN_WORDS, MAX_POST_TITLE_LENGTH_IN_CHARS } from '../../constants';
import { newPost } from '../services/post.service';
import { HttpException } from '../../exceptions/http-exception';

const createPostValidator = Joi.object({
  title: Joi.string().required().max(MAX_POST_TITLE_LENGTH_IN_CHARS),
  summary: Joi.string().optional().allow(''),
  body: Joi.string().required(),
  community: Joi.string().required()
})

export const createPostController = async (req: AuthenticatedRequest, res: Response) => {
  let value: INewPostParams;
  let error: ValidationError;

  ({value, error } = createPostValidator.validate(req.body));

  if (error) {
    res.status(400).send({ message: error.details[0].message });
    return;
  }

  if (value.summary?.split(/\s+/).length > MAX_POST_SUMMARY_LENGTH_IN_WORDS) {
    res.status(400).send({ message: `"summary" exceeds maximum word count of ${MAX_POST_SUMMARY_LENGTH_IN_WORDS} words`})
    return;
  }

  try {
    const createPostResponse = await newPost(req.auth, value);
    res.status(201).send(createPostResponse);
    return;
  }
  catch (error) {
    if (error instanceof HttpException) {
      res.status(error.status).send({message: error.message});
      return;
    }
    console.warn(error);
    res.status(500).send('An error occurred');
  }

}
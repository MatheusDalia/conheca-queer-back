import { Request, Response } from 'express';
import { Banner } from '@models/Banner';
import { Citi, Crud } from '../global'

export default class BannerController implements Crud {

    async create(request: Request, response: Response){
        const {title, description} = request.body;

        const isAnyUndefined = Citi.areValuesUndefined(title, description);
        if(isAnyUndefined) return response.status(400).send();

        const newBanner = { title, description };
        const {httpStatus, message} = await Citi.insertIntoDatabase(Banner, newBanner);

        return response.status(httpStatus).send({ message });

    }

    async get(request: Request, response: Response){
        const {httpStatus, values} = await Citi.getAll(Banner);
        return response.status(httpStatus).send(values);
    }

    async delete(request: Request, response: Response){
        const { id } = request.params;
        const {value: bannerFound, message } = await Citi.findByID(Banner, id);

        if(!bannerFound) return response.status(400).send({ message });

        const {httpStatus, messageFromDelete } = await Citi.deleteValue(Banner, bannerFound);
        return response.status(httpStatus).send({ messageFromDelete });
    } 

    async update(request: Request, response: Response){
        const { id } = request.params;
        const {title, description } = request.body;

        const isAnyUndefined = Citi.areValuesUndefined(title, description, id);
        if(isAnyUndefined) return response.status(400).send();

        const bannerWithUpdatedValues = { title, description };

        const { httpStatus, messageFromUpdate } = await Citi.updateValue(Banner, id, bannerWithUpdatedValues);
        return response.status(httpStatus).send({ messageFromUpdate });
    }
}
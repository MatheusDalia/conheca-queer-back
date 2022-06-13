import { Request, Response } from 'express';
import { Personality } from '@models/Personality';
import { Citi, Crud } from '../global'

export default class PersonalityController implements Crud {

    async create(request: Request, response: Response){
        const {image, title, description, email, youtube, instagram} = request.body;

        const isAnyUndefined = Citi.areValuesUndefined(image, title, description);
        if(isAnyUndefined) return response.status(400).send();

        const newPersonality = { image, title, description, email, youtube, instagram };
        const {httpStatus, message} = await Citi.insertIntoDatabase(Personality, newPersonality);

        return response.status(httpStatus).send({ message });
    }

    async get(request: Request, response: Response){
        const {httpStatus, values} = await Citi.getAll(Personality);
        return response.status(httpStatus).send(values);
    }

    async delete(request: Request, response: Response){
        const { id } = request.params;
        const {value: personalityFound, message } = await Citi.findByID(Personality, id); 
           
        if(!personalityFound) return response.status(400).send({ message });

        const {httpStatus, messageFromDelete } = await Citi.deleteValue(Personality, personalityFound);
        return response.status(httpStatus).send({ messageFromDelete });
    }

    async update(request: Request, response: Response){
        const { id } = request.params;
        let { image, title, description, email, youtube, instagram } = request.body;

        const isAnyUndefined = Citi.areValuesUndefined(image, title, description, id);
        if(isAnyUndefined) return response.status(400).send();

        /* to make the put method more effective (considering we now have nullable columns), I made it so, if the
        nullable column is undefined, it is to be replaced with a null value, otherwise, this method would
        work like a patch (the undefined values would remain the same as they were before the put)*/
        const isAnyUndefined1 = Citi.areValuesUndefined(email);
        if(isAnyUndefined1) email = null;

        const isAnyUndefined2 = Citi.areValuesUndefined(youtube);
        if(isAnyUndefined2) youtube = null;

        const isAnyUndefined3 = Citi.areValuesUndefined(instagram);
        if(isAnyUndefined3) instagram = null;

        const personalityWithUpdatedValues = { image, title, description, email, youtube, instagram };

        const { httpStatus, messageFromUpdate } = await Citi.updateValue(Personality, id, personalityWithUpdatedValues);
        return response.status(httpStatus).send({ messageFromUpdate });
    }
}

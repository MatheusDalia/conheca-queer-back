import { Request, Response } from 'express';
import { Projects } from '@models/Projects';
import { Citi, Crud } from '../global';

export default class ProjectsController implements Crud {

    async create(request: Request, response: Response){
        const {name, description, image, alt, link} = request.body;

        const isAnyUndefined = Citi.areValuesUndefined(name, description, image, link);
        if(isAnyUndefined) return response.status(400).send();

        const newProjects = {name, description, image, alt, link};
        const {httpStatus, message} = await Citi.insertIntoDatabase(Projects, newProjects);

        return response.status(httpStatus).send({ message });
    }

    async get(request: Request, response: Response){
        const {httpStatus, values} = await Citi.getAll(Projects);
        return response.status(httpStatus).send(values);
    }

    async delete(request: Request, response: Response){
        const { id } = request.params;
        const {value: projectsFound, message } = await Citi.findByID(Projects, id); 

        if(!projectsFound) return response.status(400).send({ message });

        const {httpStatus, messageFromDelete } = await Citi.deleteValue(Projects, projectsFound);
        return response.status(httpStatus).send({ messageFromDelete });
    }

    async update(request: Request, response: Response){
        const { id } = request.params;
        const {name, description, image, alt, link} = request.body;

        const isAnyUndefined = Citi.areValuesUndefined(name, description, image, link);
        if(isAnyUndefined) return response.status(400).send();

        const projectsWithUpdatedValues = {name, description, image, alt, link};

        const { httpStatus, messageFromUpdate } = await Citi.updateValue(Projects, id, projectsWithUpdatedValues);
        return response.status(httpStatus).send({ messageFromUpdate });
    }

}
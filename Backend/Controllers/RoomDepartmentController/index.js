const RoomTable = require('../../Models/RoomTable');
const DepartmentTable = require('../../Models/DepTable');
const Controller = require('../Controller');

class RoomDepartmentController{
    static async indexRoom(req, res){
        /*
            #swagger.tags = ['Rooms n departments controll']
            #swagger.description = "Retornar todas as salas ou apenas uma"
            #swagger.parameters['room']={
                description: "Id da sala procurada",
                type:'integer',
                required:false,
                in:'query',
            }    
        */
        try{ 
            const room = req.query?.room;
            var resRooms;
            if(room){
                resRooms = await RoomTable.findOne({where:{id:room}});
                if(resRooms != '') throw new Error('Error to search room');
            }else{
                resRooms = await RoomTable.findAll();
            }
            res.status(200).json(resRooms);
        }catch(error){
            if(error) console.log(error); 
            res.status(500).json({msg:"[ERROR] Cant't send rooms!"});
        }
    }

    static async indexDepartment(req, res){
        /*
            #swagger.tags = ['Rooms n departments controll']
            #swagger.description = "Retornar todos departamentos ou apenas um"
            #swagger.parameters['department']={
                description:"Id do departamento procurado",
                type:'integer',
                required:false,
                in:'query',
            }
        */
        try{ 
            const department = req.query?.department;
            var resDepartment;
            if(department){
                resDepartment = await DepartmentTable.findOne({where:{id:department}});
                if(resDepartment != '') throw new Error('Error to search department');
            }else{
                resDepartment = await DepartmentTable.findAll();
            }
            res.status(200).json(resDepartment);
        }catch(error){
            if(error) console.log(error); 
            res.status(500).json({msg:"[ERROR] Cant't send departments!"});
        }
    }
    
    static async createRoom(req, res){
        /*
            #swagger.tags = ['Rooms n departments controll']
            #swagger.description = "Criar uma nova sala"
            #swagger.parameters['nRoom']={
                description: "N??mero da sala",
                type:'string',
                required:true,
                in:'body',
            }
            #swagger.parameters['deparmentId']={
                description: "Id do departamento da sala",
                type:'string',
                required:true,
                in:'body',
            }
        */
        await Controller.DepartmentsRooms();
        const {nRoom, departmentId} = req.body;
        try{ 
            await RoomTable.create({
                nRoom,
                departmentId
            });
            res.status(201).json({msg:`Room ${nRoom} created successfully!`})
        }catch(error){
            if(error) console.log(error);
            res.status(500).json({msg:"[ERROR] Can't create new room!"});
        }
    }
    
    static async createDepartment(req, res){
        /*
            #swagger.tags = ['Rooms n departments controll']
            #swagger.description = "Criar um novo departamento"
            #swagger.parameters['name']={
                description: "Nome do departamento",
                type:'string',
                required:true,
                in:'body',
            }    
        */
        const {name} = req.body;
        try{ 
            await DepartmentTable.create({ name });
            res.status(201).json({msg:`Department ${name} created successfully!`});
        }catch(error){
            if(error) console.log(error);
            res.status(500).json({msg:"[ERROR] Can't create new room!"});
        }
    }
    
    static async updateRoom(req, res){
        /*
            #swagger.tags = ['Rooms n departments controll']
            #swagger.description = "Modificar uma sala"
            #swagger.parameters['currentNRoom']={
                description: "Atual n??mero da sala",
                type:'string',
                required:true,
                in:'body',
            }
            #swagger.parameters['currentDepartmentId']={
                description: "Id do departamento atual da sala",
                type:'integer',
                required:true,
                in:'body',
            }
            #swagger.parameters['newNRoom']={
                description: "Novo n??mero da sala",
                type:'string',
                required:true,
                in:'body',
            }
            #swagger.parameters['newDepartmentId']={
                description: "Id do novo departamento da sala",
                type:'integer',
                required:true,
                in:'body',
            }
        */
        const { currentNRoom, currentDepartmentId, newNRoom, newDepartmentId } = req.body;
        try{
            await RoomTable.update({
                nRoom:newNRoom,
                departmentId:newDepartmentId
            },{where:{
                nRoom:currentNRoom,
                departmentId:currentDepartmentId
            }});
            res.status(200).json({msg:`The room ${currentNRoom} on ${currentDepartmentId} department was modificated to room ${newNRoom} on ${newDepartmentId}!`});
        }catch(error){
            if(error) console.log(error);
            res.status(500).json({ msg:"[ERROR] Can't modificate this room!"});
        }
    }
    
    static async updateDepartment(req, res){
        /*
            #swagger.tags = ['Rooms n departments controll']
            #swagger.description = "Modificar um departamento"
            #swagger.parameters['currentName']={
                description: "Atual nome da sala",
                type:'string',
                required:true,
                in:'body',
            }
            #swagger.parameters['newName']={
                description: "Novo nome do departamento",
                type:'string',
                required:true,
                in:'body',
            }
        */
        const { currentName, newName} = req.body;
        try{
            await DepartmentTable.update({
                name: newName
            },{ where:{
                name:currentName 
            }});
            res.status(200).json({msg:`The department ${currentName} was modificated to department ${newName}!`});
        }catch(error){
            if(error) console.log(error);
            res.status(500).json({msg:"[ERROR] Can't midificate this department!"});
        }
    }
    
    static async deleteRoom(req, res){
        /*
            #swagger.tags = ['Rooms n departments controll']
            #swagger.description = "Apagar sala"
            #swagger.parameters['id']={
                description: "Id da sala",
                type:'path',
                required:true,
                in:'body',
            }
        */
        const { id } = req.params;
        try{
            await RoomTable.destroy({where:{id}})
            res.status(200).json({msg:`Room with id ${id} was deleted!`});
        }catch(error){
            if(error) console.log(error);
            res.status(500).json({msg:"[ERROR] Can't exclude this Room!"});
        }
    }
    
    static async deleteDepartment(req, res){
        /*
            #swagger.tags = ['Rooms n departments controll']
            #swagger.description = "Apagar um departamento"
            #swagger.parameters['id']={
                description: "Id do departamento",
                type:'path',
                required:true,
                in:'body',
            }
        */
        const { id } = req.params;
        try{
            await DepartmentTable.destroy({where:{ id }});
            res.status(200).json({msg:`Department with id ${id} was deleted!`});
        }catch(error){
            if(error) console.log(error);
            res.status(500).json({msg:"[ERROR] Can't exclude this Department!"});
        }
    }
}

module.exports = RoomDepartmentController;
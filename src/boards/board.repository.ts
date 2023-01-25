import { Injectable } from "@nestjs/common";
import { DataSource, EntityRepository, Repository } from "typeorm";
import { BoardStatus } from "./board-status.enum";
import { Board } from "./board.entity";
import { BoardsService } from "./boards.service";
import { CreateBoardDto } from "./dto/create-board.dto";

@Injectable()
export class BoardRepository extends Repository<Board>{
    constructor(private dataSource: DataSource){
        super(Board, dataSource.createEntityManager());
    }

    async createBoard(createBoardDto: CreateBoardDto): Promise<Board>{
        const {title, description} = createBoardDto;

        const board = await this.create({
            title,
            description,
            status: BoardStatus.PUBLIC
        })
        await this.save(board);

        return board;
    }

    async getAllBoard(): Promise<Board[]>{
        const boards = await this.find();

        return boards;
    }
}
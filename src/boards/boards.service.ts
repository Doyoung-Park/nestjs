import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import {v1 as uuid} from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository
        ){}
    // private boards: Board[] = [];

    // getAllBoards(): Board[] {
    //     return this.boards;
    // }
    getAllBoard(): Promise<Board[]>{
        return this.boardRepository.getAllBoard();
    }

    // createBoard(createBoardDto: CreateBoardDto): Board{
    //     const {title, description} = createBoardDto;

    //     const Board: Board ={
    //         id: uuid(),
    //         title,
    //         description,
    //         status: BoardStatus.PUBLIC,
    //     }
    //     this.boards.push(Board);

    //     return Board;
    // }
    createBoard(createBoardDto: CreateBoardDto): Promise<Board>{
        return this.boardRepository.createBoard(createBoardDto);
    }


    // getBoardById(id: string): Board{
    //     const found =  this.boards.find((board)=> board.id === id);

    //     if(!found){
    //         throw new NotFoundException(`Cant' find board with id ${id}`);
    //     }
    //     return found;
    // }
    async getBoardById(id: number): Promise<Board>{
        const found = await this.boardRepository.findOneBy({id});

        if(!found){
            throw new NotFoundException(`can't found Board with id ${id}`);
        }
        return found;
    }

    // deleteBoardById(id: string): string {
    //     const found = this.getBoardById(id);
    //     this.boards = this.boards.filter((board)=> board.id !== found.id);
    //     return 'Success to delete';
    // }
    async deleteBoardById(id: number){
        const result = await this.boardRepository.delete(id);
        if(result.affected !==1){
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
        console.log(result);
    }

    // updateBoardStatus(id: string, status: BoardStatus): Board{
    //     const board = this.getBoardById(id);
    //     board.status = status;

    //     return board;
    // }
    async updateBoardStatus(id:number, status: BoardStatus): Promise<Board>{
        const board = await this.boardRepository.findOneBy({id});
        board.status = status;

        const result = await this.boardRepository.save(board);
        return result;
    }
}

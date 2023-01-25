import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidation } from './pipes/board-status-validation';
import { Board } from './board.entity';

@Controller('boards')
export class BoardsController {
    constructor(private boardService: BoardsService){}

    // @Get()
    // getAllBoard(): Board[] {
    //     return this.boardService.getAllBoards();
    // }
    @Get('/')
    getAllBoard(): Promise<Board[]>{
        return this.boardService.getAllBoard();
    }
    // @Post('/create')
    // @UsePipes(ValidationPipe)
    // createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    //     return this.boardService.createBoard(createBoardDto);
    // }
    @Post('/create')
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board>{
        return this.boardService.createBoard(createBoardDto);
    }

    // @Get('/:id')
    // getBoardById(@Param('id') id: string): Board {
    //     const found = this.boardService.getBoardById(id);

    //     return found;
    // }
    @Get('/:id')
    getBoardById(@Param('id') id: number): Promise<Board>{
        return this.boardService.getBoardById(id);
    }

    // @Delete('/:id')
    // deleteBoardById(@Param('id') id: string): string {
    //     return this.boardService.deleteBoardById(id);
    // }
    @Delete('/:id')
    deleteBoardById(@Param('id', ParseIntPipe) id: number): Promise<void>{
        return this.boardService.deleteBoardById(id);
    }

    // @Patch('/:id/status')
    // updateBoardStatus(
    //     @Param('id') id: string,
    //     @Body('status', BoardStatusValidation) status: BoardStatus
    // ){
    //     return this.boardService.updateBoardStatus(id, status);
    // }
    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidation) status: BoardStatus
        ): Promise<Board> {
            return this.boardService.updateBoardStatus(id, status);
    }
}

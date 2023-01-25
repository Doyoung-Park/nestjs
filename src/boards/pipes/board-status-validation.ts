import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../board-status.enum";

export class BoardStatusValidation implements PipeTransform{

    readonly StatusOption = [
        BoardStatus.PRIVATE,
        BoardStatus.PUBLIC
    ];

    transform(value: any) {
        value = value.toUpperCase();

        if(this.isStatusValid(value) === -1){
            throw new BadRequestException(`${value} isn't in the status options`);
        }

        return value;
    }

    private isStatusValid(status: any): number {
        const index = this.StatusOption.indexOf(status);
        return index;
    }
}
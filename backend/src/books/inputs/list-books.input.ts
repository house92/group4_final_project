import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ListBooksFilter {
    @Field(() => String, {
        nullable: true,
        description: 'substring against which to match titles',
    })
    public title?: string;
}

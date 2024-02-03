import { CodegenConfig } from '@graphql-codegen/cli';
import { TypeScriptPluginConfig } from '@graphql-codegen/typescript';
import { TypeScriptDocumentsPluginConfig } from '@graphql-codegen/typescript-operations';

const config: CodegenConfig = {
    overwrite: true,
    schema: '../backend/schema.gql',
    documents: 'src/**/*',
    generates: {
        'src/generated/graphql.tsx': {
            plugins: [
                {
                    typescript: {
                        scalars: {
                            // A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format.
                            DateTime: 'string',
                        },
                        defaultScalarType: 'unknown',
                    } as TypeScriptPluginConfig,
                },
                {
                    'typescript-operations': {
                        scalars: {
                            // A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format.
                            DateTime: 'string',
                        },
                        defaultScalarType: 'unknown',
                    } as TypeScriptDocumentsPluginConfig,
                },
                'typescript-react-apollo',
            ],
        },
    },
};

export default config;

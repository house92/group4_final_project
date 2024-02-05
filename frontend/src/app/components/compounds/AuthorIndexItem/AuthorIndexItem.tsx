import { Box, Button, Stack, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useId, useState } from 'react';
import { useFormik } from 'formik';
import { object, string } from 'yup';

import { Input } from '../../primitives';
interface AuthorIndexItemInput {
    /**
     * Identifier for author index item in database
     */
    authorID: string;
    firstName: string;
    lastName: string;
    birthYear: string;
    deathYear: string;
    hometown: string;
    bio: string;
    /**
     * Identifier for user to whom course schedule belongs
     * @todo Implement admin role – otherwise userID shouldn't be editable
     */
    userID?: string;
}
interface AuthorIndexItemProps {
    authorID: string;
    firstName: string;
    lastName: string;
    birthYear: string;
    deathYear: string;
    hometown: string;
    bio: string;

    /**
     * Whether the component can be put into edit mode
     */
    canEdit?: boolean;

    /**
     * Whether the component should display a delete button
     */
    canDelete?: boolean;

    /**
     * A function to be called on form submit
     * @param values Data to be sent to server to update course schedule
     */
    onSave?: (values: AuthorIndexItemInput) => void;

    /**
     * A function to be called on delete button click
     * @param id Identifier for course schedule
     */
    onDelete?: (courseID: string) => void;
}

export default function AuthorIndexItem({
    authorID,
    firstName,
    lastName,
    birthYear,
    deathYear,
    hometown,
    bio,
    canEdit,
    canDelete,
    onSave = () => undefined,
    onDelete,
}: AuthorIndexItemProps) {
    const [isInEditMode, setIsInEditMode] = useState(false);

    const formID = useId();

    const formik = useFormik<AuthorIndexItemInput>({
        enableReinitialize: true,

        initialValues: {
            authorID,
            firstName,
            lastName,
            birthYear,
            deathYear,
            hometown,
            bio,
        },

        validateOnChange: false,
        validateOnBlur: false,
        validateOnMount: false,
        validationSchema: object().shape({
            authorID: string().required(),
            firstName: string(),
            lastName: string(),
            birthYear: string(),
            deathYear: string(),
            hometown: string(),
            bio: string(),
        }),

        onSubmit: (values) => {
            setIsInEditMode(false);
            onSave(values);
        },
    });

    const { values, isValid, dirty } = formik;

    return (
        <Stack gap={4}>
            <Box display="flex" justifyContent="space-between">
                <Typography component="h1" variant="h4">
                    Author Item Details
                </Typography>

                <Box>
                    {canEdit && !isInEditMode && (
                        <Button
                            onClick={() => setIsInEditMode(true)}
                            sx={(theme) => ({
                                borderWidth: 1,
                                borderRadius: 2,
                                borderStyle: 'solid',
                                borderColor: theme.palette.grey[400],
                                color: theme.palette.text.primary,
                            })}
                        >
                            <EditIcon color="action" />
                        </Button>
                    )}

                    {canDelete && !isInEditMode && (
                        <Button
                            onClick={() => onDelete?.(authorID)}
                            sx={(theme) => ({
                                borderWidth: 1,
                                borderRadius: 2,
                                borderStyle: 'solid',
                                borderColor: theme.palette.grey[400],
                                color: theme.palette.text.primary,
                            })}
                        >
                            <DeleteIcon color="action" />
                        </Button>
                    )}
                </Box>
            </Box>

            <Stack
                component="form"
                id={formID}
                onSubmit={formik.handleSubmit}
                onReset={formik.handleReset}
                gap={4}
                maxWidth={260}
            >
                <Input
                    label="Author Name"
                    name="authorName"
                    value={values.firstName}
                    onChange={formik.handleChange}
                    readOnly={!isInEditMode}
                />
                <Input
                    label="Birth Year"
                    name="birthYear"
                    value={values.birthYear}
                    onChange={formik.handleChange}
                    readOnly={!isInEditMode}
                />
                <Input
                    label="Hometown"
                    name="hometown"
                    value={values.hometown}
                    onChange={formik.handleChange}
                    readOnly={!isInEditMode}
                />
            </Stack>

            <Box display="flex" justifyContent="flex-end">
                {isInEditMode && (
                    <Box justifyContent="space-between">
                        <Button
                            onClick={() => setIsInEditMode(false)}
                            sx={(theme) => ({
                                ml: 2,
                                borderWidth: 1,
                                borderRadius: 2,
                                borderStyle: 'solid',
                                borderColor: theme.palette.grey[400],
                                textTransform: 'none',
                                color: theme.palette.text.secondary,
                            })}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            form={formID}
                            disabled={!isValid || !dirty}
                            sx={(theme) => ({
                                ml: 2,
                                borderWidth: 1,
                                borderRadius: 2,
                                borderStyle: 'solid',
                                borderColor: theme.palette.grey[400],
                                textTransform: 'none',
                                color: theme.palette.text.primary,
                            })}
                        >
                            Save
                        </Button>
                    </Box>
                )}
            </Box>
        </Stack>
    );
}

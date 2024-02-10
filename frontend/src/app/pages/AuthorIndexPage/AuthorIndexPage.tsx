import { AuthorIndexItem } from 'app/components';
import { useParams } from 'react-router-dom';

export default function AuthorIndexPage() {
    const { courseScheduleId } = useParams();

    const [updateCourseSchedule] = useUpdateCourseScheduleMutation();
    const [deleteCourseSchedule] = useDeleteCourseScheduleMutation();

    const { courseSchedule } = useCourseSchedule(courseScheduleId);

    if (!courseScheduleId || !courseSchedule) {
        // TODO:(sam) handle 404 case
        return null;
    }

    return (
        <AuthorIndexItem
            {...courseSchedule}
            canEdit
            canDelete
            onSave={(values) => updateCourseSchedule({ variables: { input: { id: courseScheduleId, ...values } } })}
            onDelete={(id) => deleteCourseSchedule({ variables: { id } })}
        />
    );
}
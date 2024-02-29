import RegistrationForm from "../RegistrationForm";

export default {
    title: 'Compounds/RegistrationForm',
};

export const Default = () => <RegistrationForm onSubmit={handleSubmit} />;

const handleSubmit = (RegistrationCreds) => {
    console.log('Form submitted with data:', RegistrationCreds);
};
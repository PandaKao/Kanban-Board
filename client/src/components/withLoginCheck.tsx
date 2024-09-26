import auth from '../utils/auth';

type WithLoginCheckProps = {
    checkLogin: () => boolean;
};

const withLoginCheck = <P extends object>(WrappedComponent: React.ComponentType<P &WithLoginCheckProps>) => {
    return (props: P) => {
        
        const checkLogin = () => {
            const isLoggedIn = auth.loggedIn();
            return isLoggedIn;
        };

        return <WrappedComponent {...props} checkLogin={checkLogin} />
    };
};

export default withLoginCheck;
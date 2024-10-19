import PropTypes from 'prop-types';
import { Alert } from 'react-native';

const BaseAlert = ({alertType, buttons, callback, message, title, type }) => Alert[alertType](title, message, buttons || callback, type);

BaseAlert.propTypes = {
    alertType: PropTypes.oneOf(['alert', 'prompt']).isRequired,
    buttons: PropTypes.arrayOf(
        PropTypes.shape({
            onPress: PropTypes.func,
        })
    )
}
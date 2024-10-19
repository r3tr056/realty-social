import { SCREEN_WIDTH } from '../../constants';

class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoSize: {
                height: 250,
                width: SCREEN_WIDTH
            },
            maxTimeString: ""
        }

        const { onRefReady } = props;
        if (typeof onRefReady === 'function') onRefReady(this)

        // install context
        this.pause = this.pause.bind(this);
        this.play = this.play.bind(this);
        this.play = this.play.bind(this);
        this.hideController = this.hideController.bind(this);
        
    }
}
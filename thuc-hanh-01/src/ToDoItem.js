import './style.scss';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const ToDoItem = ({ title, dueDate, completed, onEdit, onDelete, onToggle }) => {
    return (
        <div className={`ToDoItem ${completed ? 'completed' : ''}`}>
            <input type="checkbox" checked={completed} onChange={onToggle} />
            <div className='ItemContent'>
                <p className='Title'>{title}</p>
                <p className='DueDate'>{dueDate}</p>
            </div>
            <div className='Action'>
                <EditOutlined onClick={onEdit} />
                <DeleteOutlined onClick={onDelete} />
            </div>
        </div>
    );
}
export default ToDoItem;
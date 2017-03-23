import React, { PropTypes } from 'react';
import classNames from 'classNames';

import {
    ALL_TODOS,
    ACTIVE_TODOS,
    COMPLETED_TODOS
} from '../constants'
import { pluralize } from '../utils'

export default function TodoFooter ({
    count,
    nowShowing,
    completedCount,
    onClearCompleted
}) {
    const activeTodoWord = (count, 'item');
    let clearButton;

    if (completedCount > 0)  {
        clearButton = (
            <button
                className="clear-completed"
                onClick={onClearCompleted}
            >
                Clear completed
            </button>
        );
    }

    return (
        <footer className="footer">
            <span className="todo-count">
                <strong>{count}</strong> {activeTodoWord} left
            </span>
            <ul className="filters">
                <li>
                    <a
                        href="#/"
                        className={classNames({selected: nowShowing === ALL_TODOS})}>
                            All
                    </a>
                </li>
                {' '}
                <li>
                    <a
                        href="#/active"
                        className={classNames({selected: nowShowing === ACTIVE_TODOS})}>
                            Active
                    </a>
                </li>
                {' '}
                <li>
                    <a
                        href="#/completed"
                        className={classNames({selected: nowShowing === COMPLETED_TODOS})}>
                            Completed
                    </a>
                </li>
            </ul>
            {clearButton}
        </footer>
    )
}

TodoFooter.propTypes = {
    count: PropTypes.number.isRequired,
    nowShowing: PropTypes.string.isRequired,
    completedCount: PropTypes.number.isRequired,
    onClearCompleted: PropTypes.func.isRequired
}
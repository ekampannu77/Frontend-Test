import TaskManager from "@/modules/test";
import "./home.css";

export default function Home() {
    const email =
        "mailto:\u006d\u007a\u0068\u0040\u006c\u0065\u0074\u0073\u0073\u0074\u006f\u0070\u0061\u0069\u0064\u0073\u002e\u006f\u0072\u0067";

    return (
        <main>
            <div className="header-container">
                <h1>Take-Home Test – React + Next.js</h1>
                <h4>
                    This exercise helps us understand your familiarity with
                    React and Next.js in a realistic, small feature. It is used
                    only for the recruitment process at LetsStopAIDS. Please do
                    not share this with anyone else.
                </h4>

                <div className="steps">
                    <h3>Where to work</h3>
                    <ol>
                        <li>
                            Code Location: Please complete your solution in{" "}
                            <code>modules/test.tsx</code>. You must start after{" "}
                            <code>// Your Test Starts Here</code> in the
                            provided file.
                        </li>
                        <li>
                            Do not change this page component or the import
                            path. We will render the page as-is to review your
                            work.
                        </li>
                    </ol>

                    <h3>Feature Requirements</h3>
                    <p>
                        Build a small <strong>Task Manager</strong> component.
                        It should allow users to add, view, filter, complete,
                        and delete tasks.
                    </p>

                    <h4>Core requirements (must-have)</h4>
                    <ol>
                        <li>
                            <strong>Add tasks</strong>
                            <ul>
                                <li>
                                    An input for a <code>title</code>{" "}
                                    (required).
                                </li>
                                <li>
                                    A control for <code>priority</code> (Low,
                                    Medium, High).
                                </li>
                                <li>An “Add task” button.</li>
                                <li>
                                    Pressing <kbd>Enter</kbd> in the title input
                                    should also add the task.
                                </li>
                            </ul>
                        </li>
                        <li>
                            <strong>Display tasks</strong>
                            <ul>
                                <li>
                                    Show tasks in a list with title and
                                    priority.
                                </li>
                                <li>Newest tasks appear at the top.</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Complete and delete</strong>
                            <ul>
                                <li>
                                    Each task has a control (such as a checkbox)
                                    to mark it as complete.
                                </li>
                                <li>
                                    Completed tasks are visually distinct and
                                    appear below active tasks.
                                </li>
                                <li>
                                    Each task has a “Delete” button that removes
                                    only that task.
                                </li>
                            </ul>
                        </li>
                        <li>
                            <strong>Filter by status</strong>
                            <ul>
                                <li>
                                    Add filters for <code>All</code>,{" "}
                                    <code>Active</code>, and{" "}
                                    <code>Completed</code>.
                                </li>
                                <li>
                                    Clicking a filter shows only matching tasks.
                                </li>
                            </ul>
                        </li>
                        <li>
                            <strong>State management</strong>
                            <ul>
                                <li>
                                    Use the React hook <code>useState</code> to
                                    manage all task state.
                                </li>
                            </ul>
                        </li>
                        <li>
                            <strong>Validation</strong>
                            <ul>
                                <li>
                                    Do not allow adding a task when the title is
                                    empty or only whitespace.
                                </li>
                                <li>
                                    Show a clear error message near the input
                                    when validation fails.
                                </li>
                            </ul>
                        </li>
                        <li>
                            <strong>Responsiveness</strong>
                            <ul>
                                <li>
                                    The UI should be usable and readable on both
                                    mobile (&lt; 768px) and desktop (≥ 768px)
                                    widths.
                                </li>
                                <li>
                                    Inputs and buttons should not overflow the
                                    viewport horizontally.
                                </li>
                            </ul>
                        </li>
                    </ol>

                    <h4>Bonus (optional)</h4>
                    <ol>
                        <li>
                            <strong>Persistence:</strong> Save and load tasks
                            from <code>localStorage</code> so they survive a
                            page refresh.
                        </li>
                        <li>
                            <strong>Search:</strong> Add a search field to
                            filter tasks by title.
                        </li>
                        <li>
                            <strong>Edit:</strong> Allow editing an existing
                            task’s title and priority.
                        </li>
                        <li>
                            <strong>Accessibility:</strong> Use semantic HTML
                            (labels, buttons) and ensure the interface is
                            keyboard friendly.
                        </li>
                        <li>
                            <strong>Styling:</strong> If you add styles, place
                            them in <code>modules/test.module.css</code>.
                        </li>
                    </ol>

                    <p>
                        If you have any questions, please email{" "}
                        <a
                            className="underline"
                            href={email}
                            id="questionEmail"
                            target="_blank">
                            mzh&#64;
                            <b className="hidden">
                                hiddenToPreventFromCrawlers
                            </b>
                            letsstopaids
                            <b className="hidden">
                                hiddenToPreventFromCrawlers
                            </b>
                            &#46;org
                        </a>
                    </p>

                    <p>
                        Note 1: Please add brief, meaningful comments where
                        helpful (for example, to explain non-obvious logic).
                    </p>
                    <p>
                        Note 2: 🚫 Do <strong>not</strong> use external
                        libraries (UI kits, state management, etc.) to complete
                        this exercise. React, Next.js, and the browser APIs are
                        sufficient.
                    </p>
                </div>
            </div>

            <TaskManager />
        </main>
    );
}

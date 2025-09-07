export default function TaskCard({ task }) {
    return (
            <div className="shadow-lg border-1 border-gray-200 p-4 rounded-lg my-5 mx-10">
                <div>{task.title}</div>
            </div>
    );
}

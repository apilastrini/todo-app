import { useState, useEffect } from 'react';
import { TaskItem } from './../../types/components';
import workerURL from './../../cryptoWorker';

export default function TaskToAdd(props: {
  submit: (formData: TaskItem) => void;
  cancel: () => void;
}) {
  const { cancel, submit } = props;

  // Local state
  const [uuid, setUuid] = useState<string | null>(null);
  const [formData, setFormData] = useState<TaskItem>({
    id: '',
    title: '',
    description: '',
    completed: false,
    timestamp: '',
  });

  useEffect(() => {
    generateUUID();
  }, []);

  const generateUUID = () => {
    //  Create the worker using Blob URL
    const worker = new Worker(workerURL);

    // Set the UUID received from worker
    worker.onmessage = (event) => {
      setUuid(event.data);
    };
    // Send a message in order to generate the UUID
    worker.postMessage('generate');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    // Form state update
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const normalizedFormData = {
      ...formData,
      // Add uuid and timestamp before submit
      id: uuid,
      timestamp: new Date(),
    };

    submit(normalizedFormData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        Title: <input type="text" name="title" value={formData.title} onChange={handleChange} />
        <br />
        Description:
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <br />
        Completed:
        <input
          type="checkbox"
          name="completed"
          checked={formData.completed}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Add</button>
      </form>
      <br />
      <button onClick={() => cancel()}>Cancel</button>
    </div>
  );
}

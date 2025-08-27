export default function GeneralInfoSection({ data, setResumeData }) {
  const handleNameChange = (e) => {
    setResumeData((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  return (
    <>
      <h2 className="sub-title">General Information:</h2>
      <div className="name-section">
        <p>Name:</p>
        <input type="text" value={data.name} onChange={handleNameChange} />
      </div>
    </>
  );
}

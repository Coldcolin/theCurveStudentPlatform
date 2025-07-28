import React, { useEffect, useState } from 'react';
import './AssessmentTutorView.css';
import { approveAssessment, getOneUserAssessments } from '../../api/Api';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

const AssessmentSubmitionTutorView = () => {
  const { studentId } = useParams(); // Using studentId correctly
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentName, setStudentName] = useState("");
  console.log("Fetched assessments id:", studentId);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    timer: 3000,
    showConfirmButton: false,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

useEffect(() => {
  if (!studentId) return;

  const fetchAssessments = async () => {
    setLoading(true);
    try {
      const res = await getOneUserAssessments(studentId);
      console.log("Fetched assessments:", res.data.assessment);

      if (Array.isArray(res.data.assessment)) {
        const sorted = [...res.data.assessment].reverse();
        console.log("Sorted assessments:", sorted);
        setAssessments(sorted);
        setStudentName(sorted[0]?.name || "Student");
      } else {
        setAssessments([]);
        setStudentName("Student");
      }
    } catch (err) {
      console.error("Error fetching assessments", err);
      // Toast.fire({ icon: 'error', title: 'Error loading assessments' });
    } finally {
      setLoading(false);
    }
  };

  fetchAssessments();
}, [studentId]);


  const handleApprove = async (id) => {
    try {
      await approveAssessment(id);
      setAssessments((prev) =>
        prev.map((a) =>
          a._id === id ? { ...a, status: 'Approved' } : a
        )
      );
      Toast.fire({ icon: 'success', title: 'Assessment approved ✅' });
    } catch (err) {
      Toast.fire({ icon: 'error', title: 'Approval failed ❌' });
    }
  };

  return (
    <div className="tutorViewContainer">
      <h2>Assessment Submissions for: <span>{studentName}</span></h2>

      {loading ? (
        <p>Loading...</p>
      ) : assessments.length === 0 ? (
        <p>No submissions found.</p>
      ) : (
        <div className="assessmentList">
          {assessments.map((item) => (
            <div key={item._id} className="assessmentCard">
              <div>
                <h3>{item.name}</h3>
                <p><strong>Submission Link:</strong> <a href={item.submissionLink} target="_blank" rel="noreferrer">{item.submissionLink}</a></p>
                <p><strong>Date:</strong> {item.date}</p>
                <p><strong>Time:</strong> {item.time}</p>
                <p><strong>Status:</strong> {item.status}</p>
              </div>
              {item.status !== 'Approved' && (
                <button
                  className={`approveBtn ${item.status === 'Approved' ? 'disabled' : ''}`}
                  disabled={item.status === 'Approved'}
                  onClick={() => handleApprove(item._id)}
                >
                  {item.status === 'Approved' ? 'Approved ✅' : 'Approve Assessment'}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssessmentSubmitionTutorView;

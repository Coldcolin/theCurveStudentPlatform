import React, { useState, useEffect } from 'react';
import './AssessmentSubmission.css';
import { createAssessment, getOneUserAssessments } from '../../api/Api';
import { useSelector } from "react-redux";
import Swal from "sweetalert2";


const AssessmentSubmission = () => {
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [github, setGithubrepo] = useState('');
    const [submittedRepos, setSubmittedRepos] = useState([]);
    const profile = useSelector((state) => state.Id.Id);

     const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        timer: 3000,
        showConfirmButton: false,
        didOpen: (toast) =>{
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

    useEffect(() => {
        setDisabled(!github.trim());
    }, [github]);


    useEffect(() => {
        const fetchSubmittedRepos = async () => {
            try {
                const res = await getOneUserAssessments({
                    email: profile?.email
                });
                console.log(res)
                if (res?.status === 200) {
                    setSubmittedRepos(res.data.assessment);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchSubmittedRepos();
    }, []);

    const handleSubmit = async () => {
        if (!github.trim()) return;

        setLoading(true);
        // setError('');
        
        try {
            const res = await createAssessment({
                github: github.trim(),
                name: profile?.name || "Anonymous",
                email: profile?.email,
                stack: profile?.stack
            });

            if (res?.status === 201) {
                setSubmittedRepos(prev => [res.data.assessment, ...prev]);
                setGithubrepo('');
                Toast.fire({
                icon: 'success',
                 title: `${res.data.message}`
            })
            } else {
                // setError(res?.data?.message || "Submission failed");
                Toast.fire({
                icon: 'error',
                 title: `${res.data.message}`
                })
            }
        } catch (err) {
            // setError(err.response.data.message || "Submission failed");
               Toast.fire({
                icon: 'error',
                 title: `${err.response.data.message}`
                })
            // console.log(err.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='assessmentCotainner'>
            <h2>GitHub Assignment Submission Portal</h2>
            <p>Submit Your GitHub Assignment Here</p>

            <div className="assessmentWrapper">
                <p>Kindly submit the link to your GitHub assignment repository here.</p>
                
                <input
                    type="text"
                    placeholder='GitHub Repository Link'
                    value={github}
                    name='github'
                    onChange={(e) => setGithubrepo(e.target.value)}
                />
                
                <button
                    disabled={disabled || loading}
                    style={{
                        opacity: disabled || loading ? 0.5 : 1,
                        cursor: disabled || loading ? 'not-allowed' : 'pointer'
                    }}
                    onClick={handleSubmit}
                >
                    {loading ? 'Submitting...' : 'Submit Assignment'}
                </button>

                {/* {error && <p style={{ color: 'red', marginTop: '8px', fontSize: '14px', fontFamily: 'sans-serif' }}>{error}</p>} */}
            </div>

            <div className="SubmittedassessmentWrapper">
                {submittedRepos.length > 0 ? (
                    submittedRepos.map((repo, index) => (
                        <article key={index} className='assessmentResultBox'>
                            <h3>{repo.name}</h3>
                            <p>{repo.github}</p>
                            <span>{repo.status}</span>
                        </article>
                    ))
                ) : (
                    <p>No submissions yet.</p>
                )}
            </div>
        </div>
    );
};

export default AssessmentSubmission;

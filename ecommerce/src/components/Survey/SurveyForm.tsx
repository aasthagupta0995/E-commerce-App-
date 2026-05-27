import * as yup from 'yup'
import { useFormik } from 'formik'
import { useState } from 'react'

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email format').required('Email is required').test("is-gmail", "Only Gmail addresses are allowed", (value) => {
        return value ? value.endsWith('@gmail.com') : false
    }),
    feedback: yup.string().required('Feedback is required').min(10, 'Feedback must be at least 10 characters')
})

const SurveyForm = () => {
    const [showSuccess, setShowSuccess] = useState(false)
    const clearForm = () => {
        formik.resetForm()
    }

  const handleSubmit = (values: { name: string; email: string; feedback: string }) => {
    console.log('Survey submitted:', values)
        setShowSuccess(true)
        window.setTimeout(() => {
            setShowSuccess(false)
        }, 2500)
        clearForm()
  }


   const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            feedback: ''
        },
        validationSchema: schema,
        onSubmit: handleSubmit
    })


    return (
        <section className="auth-page survey-page">
            {showSuccess && (
                <div className="submit-toast" role="status" aria-live="polite">
                    Thanks for submitting your feedback.
                </div>
            )}
            <div className="survey-layout">
                <aside className="survey-note">
                    <p className="eyebrow">Customer Experience</p>
                    <h2>Your feedback matters</h2>
                    <p>
                        We read every response to improve product quality, delivery speed,
                        and support experience.
                    </p>
                    <ul>
                        <li>Quick form completion</li>
                        <li>Clear follow-up actions</li>
                        <li>Better shopping journey</li>
                    </ul>
                </aside>

                <div className="auth-card survey-card">
                    <h1>Survey Form</h1>
                    <p className="form-helper">Share your feedback so we can improve your shopping experience.</p>

                    <form onSubmit={formik.handleSubmit} noValidate>
                        <label htmlFor="name">
                            Name
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Your full name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={formik.touched.name && formik.errors.name ? 'input-error' : ''}
                            />
                            {formik.touched.name && formik.errors.name && (
                                <span className="field-error">{formik.errors.name}</span>
                            )}
                        </label>

                        <label htmlFor="email">
                            Email
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="name@example.com"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={formik.touched.email && formik.errors.email ? 'input-error' : ''}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <span className="field-error">{formik.errors.email}</span>
                            )}
                        </label>

                        <label htmlFor="feedback">
                            Feedback
                            <textarea
                                id="feedback"
                                name="feedback"
                                placeholder="Tell us what went well and what we can do better"
                                value={formik.values.feedback}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={formik.touched.feedback && formik.errors.feedback ? 'input-error' : ''}
                            ></textarea>
                            {formik.touched.feedback && formik.errors.feedback && (
                                <span className="field-error">{formik.errors.feedback}</span>
                            )}
                        </label>

                        <button type="submit">Submit Feedback</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default SurveyForm
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const steps = [
  { title: 'נרשמים', text: 'יוצרים חשבון, ורכז/ת ההתנדבויות מאשר/ת אותו.' },
  { title: 'בוחרים משימה', text: 'ליווי חולה, חלוקת סלי מזון, עזרה לקשיש או הסעה, באזור שלך.' },
  { title: 'מקבלים פרטים', text: 'אחרי ההצטרפות מופיעים הכתובת המדויקת ואיש הקשר.' },
  { title: 'עוזרים ומדווחים', text: 'מגיעים, עוזרים, ולוחצים "ביצעתי". הרכז/ת רואה הכול.' },
];

const features = [
  { title: 'חיפוש וסינון', text: 'לפי אזור, סוג משימה וסטטוס.' },
  { title: 'פרטיות', text: 'הכתובת ואיש הקשר גלויים רק למי שהצטרף.' },
  { title: 'המשימות שלי', text: 'כל ההתנדבויות שלך במקום אחד.' },
  { title: 'ניהול לרכזים', text: 'פרסום משימות, אישור מתנדבים ומעקב ביצוע.' },
];

const benefits = [
  'כל משימות החסד בעיר במקום אחד',
  'מצטרפים בלחיצה אחת',
  'הרכז/ת יודע/ת בדיוק מי מגיע',
];

function HomePage() {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/tasks" replace />
  }
  return (
    <div className="space-y-16">
      <section className="bg-brand-700 px-6 py-16 text-center text-white">
        <span className="inline-block border border-accent-600 px-3 py-1 text-sm text-accent-100">מערכת לניהול התנדבויות</span>
        <h1 className="mt-6 text-5xl font-bold">רגע של חסד</h1>
        <p className="mt-4 text-xl text-brand-100">מה תעשו היום בשביל מישהו אחר?</p>
        <p className="mx-auto mt-4 max-w-2xl text-brand-100">
          רגע של חסד מחברת בין רכזי התנדבויות למתנדבים: רכזים מפרסמים משימות בעיר, ומתנדבים בוחרים איפה לעזור.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/login" className="rounded-sm bg-accent-600 px-6 py-2.5 font-semibold text-white hover:bg-accent-700 hover:no-underline">כניסה</Link>
          <Link to="/register" className="rounded-sm border border-white px-6 py-2.5 font-semibold text-white hover:bg-white/10 hover:no-underline">הרשמה</Link>
        </div>
      </section>

      <section className="text-center">
        <h2 className="mb-2">איך זה עובד?</h2>
        <p className="mb-8 text-gray-600">ארבעה שלבים פשוטים, מההרשמה ועד העזרה בפועל</p>
        <ul className="grid gap-4 text-start sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="border border-gray-200 border-t-4 border-t-accent-600 bg-white p-6">
              <span className="text-3xl font-bold text-brand-100">{index + 1}</span>
              <h3 className="mt-2 text-brand-800">{step.title}</h3>
              <p className="mt-1 text-gray-600">{step.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-8 border border-gray-200 bg-white p-8 lg:grid-cols-2">
        <div>
          <h2>למה <span className="text-accent-600">רגע של חסד</span>?</h2>
          <p className="text-gray-600">
            התנדבות היא דבר גדול, אבל התיאום סביבה יכול להיות מסובך. המערכת מסדרת אותו, כך שנשאר רק לעזור.
          </p>
          <ul className="mt-6 space-y-2">
            {benefits.map(benefit => <li key={benefit} className="font-semibold text-brand-800">✓ {benefit}</li>)}
          </ul>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {features.map(feature => (
            <li key={feature.title} className="border border-gray-200 p-5">
              <h3 className="text-brand-800">{feature.title}</h3>
              <p className="mt-1 text-gray-600">{feature.text}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default HomePage


import React, { useState } from 'react';
import { AITutor } from './components/AITutor';
import { VoiceAssistant } from './components/VoiceAssistant';
import { MathBranch } from './types';

const branches: MathBranch[] = [
  { id: '1', title: 'الجبر الحديث', icon: 'fa-square-root-variable', description: 'دراسة المعادلات والمتباينات والأنظمة الخطية.', lessons: 24 },
  { id: '2', title: 'الهندسة التحليلية', icon: 'fa-draw-polygon', description: 'استكشاف الأشكال والمساحات والعلاقات المكانية.', lessons: 18 },
  { id: '3', title: 'التفاضل والتكامل', icon: 'fa-chart-line', description: 'فهم معدلات التغير والمساحات تحت المنحنيات.', lessons: 32 },
  { id: '4', title: 'الإحصاء والاحتمالات', icon: 'fa-chart-pie', description: 'تحليل البيانات وتوقع النتائج المستقبلية.', lessons: 15 },
  { id: '5', title: 'حساب المثلثات', icon: 'fa-triangle-exclamation', description: 'العلاقات بين زوايا المثلثات وأطوال أضلاعها.', lessons: 12 },
  { id: '6', title: 'الرياضيات التطبيقية', icon: 'fa-microchip', description: 'استخدام الرياضيات في حل مشاكل العالم الحقيقي.', lessons: 20 },
];

const App: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'none' | 'about' | 'privacy' | 'terms'>('none');

  const closeModal = () => setActiveModal('none');

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBranches = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('branches');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Voice Conversational AI Assistant */}
      <VoiceAssistant />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-effect border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <i className="fas fa-infinity text-white text-xl"></i>
            </div>
            <span className="text-2xl font-black text-slate-800 tracking-tight">MATH<span className="text-blue-600">MASTER</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
            <a href="#" onClick={scrollToTop} className="hover:text-blue-600 transition-colors">الرئيسية</a>
            <a href="#branches" onClick={scrollToBranches} className="hover:text-blue-600 transition-colors">الفروع</a>
            <button 
              onClick={() => setActiveModal('about')} 
              className="hover:text-blue-600 transition-colors"
            >
              عن المنصة
            </button>
            <button className="bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">ابدأ التعلم</button>
          </div>
        </div>
      </nav>

      {/* Modal Container */}
      {activeModal !== 'none' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="absolute top-0 left-0 w-full h-2 math-gradient"></div>
            <button 
              onClick={closeModal}
              className="absolute top-4 left-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
            
            {activeModal === 'about' && (
              <>
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600 mb-4">
                    <i className="fas fa-info-circle text-2xl"></i>
                  </div>
                  <h2 className="text-3xl font-black text-slate-900">عن منصة MathMaster AI</h2>
                </div>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p className="bg-blue-50/50 p-4 rounded-xl border-r-4 border-blue-600 font-bold text-slate-800 mb-4">
                    تحت إشراف وإدارة الأستاذ عبدالرازق فتحي
                  </p>
                  <p>تعد منصة <strong>MathMaster AI</strong> ثورة في عالم التعليم الرقمي العربي، حيث صُممت لتكون الرفيق الأكاديمي الأول لكل طالب يبحث عن التميز في علوم الرياضيات.</p>
                  <p>تجمع المنصة بين الخبرة التربوية العميقة للأستاذ عبدالرازق فتحي وبين أحدث تقنيات الذكاء الاصطناعي، مما يتيح للطلاب الحصول على إجابات فورية وشروحات تفصيلية في ثوانٍ معدودة.</p>
                  <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                    <h4 className="font-bold text-blue-900 mb-2">رؤيتنا:</h4>
                    <p className="text-blue-800/80">خلق جيل عربي مبدع ومتمكن رياضياً، يمتلك أدوات العصر الحديث للتفوق في كافة المجالات العلمية والتقنية.</p>
                  </div>
                </div>
              </>
            )}

            {activeModal === 'privacy' && (
              <>
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-50 text-green-600 mb-4">
                    <i className="fas fa-user-shield text-2xl"></i>
                  </div>
                  <h2 className="text-3xl font-black text-slate-900">سياسة الخصوصية</h2>
                </div>
                <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
                  <p>خصوصيتك تهمنا بقدر ما تهمنا قدراتك الرياضية. نحن في MathMaster AI نلتزم بحماية بياناتك الشخصية:</p>
                  <ul className="list-disc pr-6 space-y-2">
                    <li><strong>البيانات التي نجمعها:</strong> نجمع فقط المعلومات الضرورية لتحسين تجربتك التعليمية، مثل سجل المحادثات مع المعلم الذكي لتحسين جودة الردود.</li>
                    <li><strong>تأمين البيانات:</strong> نستخدم تقنيات تشفير متطورة لضمان عدم وصول أي طرف ثالث لبياناتك الشخصية.</li>
                    <li><strong>حقوقك:</strong> يمكنك في أي وقت طلب مسح سجل محادثاتك أو تعديل معلومات حسابك.</li>
                  </ul>
                  <p className="bg-slate-50 p-4 rounded-xl italic">تحديث: تم آخر تحديث لسياسة الخصوصية في يناير 2024 بما يتوافق مع المعايير العالمية لحماية البيانات.</p>
                </div>
              </>
            )}

            {activeModal === 'terms' && (
              <>
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-50 text-amber-600 mb-4">
                    <i className="fas fa-file-contract text-2xl"></i>
                  </div>
                  <h2 className="text-3xl font-black text-slate-900">الشروط والأحكام</h2>
                </div>
                <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
                  <p>باستخدامك لمنصة MathMaster AI، فإنك توافق على الشروط التالية:</p>
                  <ul className="list-decimal pr-6 space-y-2">
                    <li><strong>الاستخدام العادل:</strong> المنصة مخصصة للأغراض التعليمية الشخصية. يمنع استخدام الروبوتات أو الأدوات الآلية لاستخراج البيانات بشكل مكثف.</li>
                    <li><strong>دقة المعلومات:</strong> بينما يسعى المعلم الذكي لتقديم أدق الحلول، يجب على الطالب مراجعة الخطوات وفهم المنطق الرياضي خلف الحل.</li>
                    <li><strong>الملكية الفكرية:</strong> جميع المحتويات من فيديوهات وشروحات هي ملكية حصرية للمنصة ولا يجوز إعادة نشرها تجارياً.</li>
                    <li><strong>السلوك:</strong> يلتزم المستخدم بالتعامل اللبق مع أدوات المنصة وعدم محاولة اختراق أو تعطيل أي من خدماتها.</li>
                  </ul>
                </div>
              </>
            )}
            
            <button 
              onClick={closeModal}
              className="mt-8 w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all"
            >
              موافق
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/50 -z-10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-tight">
            مستقبل تعلم الرياضيات <br/> 
            <span className="text-transparent bg-clip-text math-gradient">بين يديك الآن</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            منصة تعليمية متكاملة تجمع بين قوة المناهج التقليدية وذكاء التكنولوجيا الحديثة لتوفير تجربة تعليمية لا تُنسى.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl">اكتشف الدروس</button>
            <button 
              onClick={() => setActiveModal('about')}
              className="bg-white text-slate-900 border-2 border-slate-100 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all"
            >
              عن المنصة
            </button>
          </div>
        </div>
      </header>

      {/* AI Tutor Section */}
      <section className="py-24 bg-slate-900 relative">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="text-white">
            <h2 className="text-4xl font-black mb-6">المعلم الذكي <span className="text-blue-400">MathMaster AI</span></h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              لا تنتظر حتى الحصة القادمة! معلمنا المدعوم بالذكاء الاصطناعي متاح على مدار الساعة للإجابة على جميع تساؤلاتك وحل أعقد المسائل الرياضية بخطوات تفصيلية.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <i className="fas fa-check-circle text-green-400 text-xl"></i>
                <span>حلول فورية لجميع فروع الرياضيات</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-check-circle text-green-400 text-xl"></i>
                <span>شرح مفصل خطوة بخطوة</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-check-circle text-green-400 text-xl"></i>
                <span>دعم كامل لجميع المستويات الدراسية</span>
              </li>
            </ul>
          </div>
          <div>
            <AITutor />
          </div>
        </div>
      </section>

      {/* Branches Section */}
      <section id="branches" className="py-32 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-black text-slate-900 mb-4">فروع الرياضيات</h2>
          <p className="text-slate-500 max-w-xl mx-auto">اختر الفرع الذي تريد إتقانه وابدأ رحلة التعلم مع أفضل المناهج والشروحات.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {branches.map(branch => (
            <div key={branch.id} className="group p-8 rounded-3xl bg-white border border-slate-100 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-100 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <i className={`fas ${branch.icon} text-2xl`}></i>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{branch.title}</h3>
              <p className="text-slate-500 mb-6 leading-relaxed">{branch.description}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-blue-600 font-medium">{branch.lessons} درس فيديو</span>
                <button className="text-slate-400 group-hover:text-blue-600 transition-colors">
                  <i className="fas fa-arrow-left-long"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <div className="text-4xl font-black mb-2">+15,000</div>
            <div className="text-blue-100">طالب نشط</div>
          </div>
          <div>
            <div className="text-4xl font-black mb-2">+500</div>
            <div className="text-blue-100">ساعة فيديو</div>
          </div>
          <div>
            <div className="text-4xl font-black mb-2">+20,000</div>
            <div className="text-blue-100">مسألة محلولة</div>
          </div>
          <div>
            <div className="text-4xl font-black mb-2">100%</div>
            <div className="text-blue-100">رضا الطلاب</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 pt-20 pb-10 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
             <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-600 p-2 rounded-lg text-white">
                  <i className="fas fa-infinity text-xl"></i>
                </div>
                <span className="text-2xl font-black text-slate-800">MATHMASTER</span>
              </div>
              <p className="text-slate-500 max-w-sm leading-relaxed mb-4">
                نحن نسعى لتغيير مفهوم تعلم الرياضيات في العالم العربي من خلال توفير أدوات ذكية ومحتوى عالي الجودة ينافس المستويات العالمية.
              </p>
              <p className="text-slate-800 font-bold flex items-center gap-2">
                <i className="fas fa-user-tie text-blue-600"></i>
                إدارة: أ. عبدالرازق فتحي
              </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-6">روابط سريعة</h4>
            <ul className="space-y-4 text-slate-500">
              <li><button onClick={() => setActiveModal('about')} className="hover:text-blue-600">عن المنصة</button></li>
              <li><button onClick={() => setActiveModal('privacy')} className="hover:text-blue-600">سياسة الخصوصية</button></li>
              <li><button onClick={() => setActiveModal('terms')} className="hover:text-blue-600">الشروط والأحكام</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-6">تواصل معنا</h4>
            <div className="flex gap-4 mb-6">
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-all"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-all"><i className="fab fa-twitter"></i></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-all"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
        <div className="text-center text-slate-400 border-t border-slate-200 pt-10">
          <p>© 2026 جميع الحقوق محفوظة لمنصة MathMaster AI التعليمية - بإشراف أ. عبدالرازق فتحي.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;

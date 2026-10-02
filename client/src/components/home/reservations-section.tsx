import ReservationForm from "@/components/reservations/reservation-form";

export default function ReservationsSection() {
  return (
    <section id="reservations" className="py-20 bg-gradient-to-br from-chicken-black via-gray-900 to-chicken-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10">
          <i className="fas fa-calendar-alt text-8xl"></i>
        </div>
        <div className="absolute bottom-10 right-10">
          <i className="fas fa-utensils text-6xl"></i>
        </div>
        <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2">
          <i className="fas fa-chair text-7xl"></i>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-amiri font-bold text-4xl md:text-5xl mb-6">احجز طاولتك</h2>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
            استمتع بتجربة طعام لا تُنسى في مطعم تشكن هات مع أجواء مريحة وخدمة متميزة
          </p>
          <div className="w-24 h-1 bg-chicken-gold mx-auto mt-6"></div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="bg-chicken-gold text-chicken-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-chair text-2xl"></i>
            </div>
            <h3 className="font-bold text-xl mb-2">أجواء مريحة</h3>
            <p className="text-gray-300">جلسات مريحة ومناسبة لجميع المناسبات</p>
          </div>

          <div className="text-center">
            <div className="bg-chicken-gold text-chicken-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-birthday-cake text-2xl"></i>
            </div>
            <h3 className="font-bold text-xl mb-2">مناسبات خاصة</h3>
            <p className="text-gray-300">احتفل بمناسباتك الخاصة معنا</p>
          </div>

          <div className="text-center">
            <div className="bg-chicken-gold text-chicken-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-star text-2xl"></i>
            </div>
            <h3 className="font-bold text-xl mb-2">خدمة متميزة</h3>
            <p className="text-gray-300">فريق عمل متخصص لخدمتكم</p>
          </div>
        </div>

        {/* Reservation Form */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <ReservationForm />
        </div>
      </div>
    </section>
  );
}
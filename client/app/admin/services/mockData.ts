import { Patient, Appointment } from '../types';

export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Alice Wonderland',
    age: 28,
    gender: 'Female',
    email: 'alice@wonderland.com',
    phone: '+91 9876543210 ',
    address: '10 Downing St, Wonderland',
    history: ['Minor wrist strain (2023)'],
    currentCondition: 'Routine postural assessment',
    treatmentPlan: 'Core alignment exercises.',
  },
  {
    id: '2',
    name: 'Sarah Jenkins',
    age: 34,
    gender: 'Female',
    email: 'sarah.j@example.com',
    phone: '+1 555-0101',
    address: '123 Pine St, Cityville',
    history: ['ACL reconstruction (2022)', 'Mild lower back pain'],
    currentCondition: 'Recovering from ankle sprain (Grade II)',
    treatmentPlan: 'Strengthening exercises and ultrasound therapy.',
  },
  {
    id: '3',
    name: 'Michael Chen',
    age: 45,
    gender: 'Male',
    email: 'm.chen@example.com',
    phone: '+1 555-0202',
    address: '456 Oak Ave, Townsville',
    history: ['Carpal tunnel syndrome', 'Chronic neck stiffness'],
    currentCondition: 'Rotator cuff tendinitis',
    treatmentPlan: 'Manual therapy and range-of-motion drills.',
  },
  {
    id: '4',
    name: 'Emma Rodriguez',
    age: 28,
    gender: 'Female',
    email: 'emma.r@example.com',
    phone: '+1 555-0303',
    address: '789 Maple Rd, Village',
    history: ['Post-natal recovery'],
    currentCondition: 'Sciatica during pregnancy',
    treatmentPlan: 'Prenatal safe stretching and core stabilization.',
  },
  {
    id: '5',
    name: 'David Brown',
    age: 40,
    gender: 'Male',
    email: 'david.brown@example.com',
    phone: '+1 555-0404',
    address: '90 Cedar Lane, Midtown',
    history: ['Lumbar strain (2021)'],
    currentCondition: 'Lower back pain due to prolonged desk work',
    treatmentPlan: 'Mobility drills and ergonomic correction plan.',
  },
  {
    id: '6',
    name: 'Priya Nair',
    age: 31,
    gender: 'Female',
    email: 'priya.nair@example.com',
    phone: '+1 555-0505',
    address: '42 Lake View, Riverside',
    history: ['Shoulder impingement (2022)'],
    currentCondition: 'Postural neck stiffness and shoulder tightness',
    treatmentPlan: 'Scapular strengthening and posture correction.',
  },
];

const toIsoDate = (value: Date): string => {
  return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}`;
};

const createDateForCurrentMonth = (day: number): string => {
  const current = new Date();
  return toIsoDate(new Date(current.getFullYear(), current.getMonth(), day));
};

const timeSlots = ['09:00', '10:30', '12:00', '14:00', '15:30'];
const doctorPool = ['Dr. Smith', 'Dr. House', 'Dr. Lee', 'Dr. Carter'];

const appointmentNotes: { [key: string]: string[] } = {
  '1': [
    'Patient shows good progress with posture. Continue core work.',
    'Minor discomfort noted. Adjusted exercise intensity.',
    'Excellent compliance with home exercises. Ready for advanced drills.',
    'Follow-up ultrasound shows improvement.',
    'Referred to nutrition for complementary support.',
  ],
  '2': [
    'Ankle mobility improving. ROM increased by 15 degrees.',
    'Continue strengthening protocol. Patient ahead of schedule.',
    'Slight swelling remains. Ice and elevation recommended.',
    'Patient reports significant reduction in pain.',
    'Ready to begin proprioceptive training.',
  ],
  '3': [
    'Rotator cuff response to therapy is positive.',
    'Arm strength improving. Range of motion still limited.',
    'Patient experiencing occasional sharp pain. Modified exercises.',
    'Significant improvement noted. Discharge plan discussed.',
    'Patient to follow maintenance routine long-term.',
  ],
  '4': [
    'Sciatica symptoms reducing. Pregnancy accommodations working well.',
    'Patient comfortable with current treatment plan.',
    'Increased stretching tolerance. Added breathing techniques.',
    'Follow-up in 2 weeks. Monitor lower back closely.',
    'Patient reports improved sleep and mobility.',
  ],
  '5': [
    'Ergonomic setup at office implemented successfully.',
    'Lower back pain severity reduced from 8/10 to 5/10.',
    'Excellent response to mobility drills.',
    'Patient maintaining home exercise program consistently.',
    'Discharge to maintenance therapy recommended.',
  ],
  '6': [
    'Shoulder tightness responding well to scapular work.',
    'Posture significantly improved. Neck strain reduced.',
    'Patient diligent with corrective exercises.',
    'Ready for advanced strengthening phase.',
    'Will reassess after 4 weeks. Great progress overall.',
  ],
};

const generateAppointments = (): Appointment[] => {
  const results: Appointment[] = [];
  const today = new Date();
  const currentDay = today.getDate();
  let counter = 1;

  for (let day = 1; day <= 28; day++) {
    const date = createDateForCurrentMonth(day);
    const sessionsPerDay = day % 2 === 0 ? 2 : 1;

    for (let index = 0; index < sessionsPerDay; index++) {
      const patient = mockPatients[(day + index) % mockPatients.length];
      const isPast = day < currentDay;
      const status: Appointment['status'] = isPast
        ? index % 3 === 0
          ? 'Cancelled'
          : 'Completed'
        : day === currentDay && index === 0
          ? 'Completed'
          : 'Upcoming';

      const patientNotes = appointmentNotes[patient.id] || [];
      const noteIndex = (day + index) % patientNotes.length;

      results.push({
        id: `a-${counter++}`,
        date,
        status,
        patientId: patient.id,
        patientName: patient.name,
        time: timeSlots[(day + index) % timeSlots.length],
        type: index % 3 === 0 ? 'Initial' : index % 2 === 0 ? 'Follow-up' : 'Session',
        doctorName: doctorPool[(day + index) % doctorPool.length],
        isEmergency: day === currentDay && index === 0,
        notes: status === 'Completed' ? patientNotes[noteIndex] : undefined,
      });
    }
  }

  return results;
};

export const mockAppointments: Appointment[] = generateAppointments();

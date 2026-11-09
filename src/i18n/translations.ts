import { SupportedLanguage } from '../types';

export interface Translations {
  // Brand & Navigation
  brandName: string;
  brandTagline: string;
  navHome: string;
  navSearch: string;
  navPnrStatus: string;
  navMyBookings: string;
  navLogin: string;
  navRegister: string;
  navLogout: string;
  navWelcome: string;

  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  fromStation: string;
  toStation: string;
  journeyDate: string;
  travelClass: string;
  quota: string;
  searchTrains: string;
  swapStations: string;
  allClasses: string;
  generalQuota: string;
  tatkalQuota: string;
  ladiesQuota: string;
  seniorCitizenQuota: string;

  // Highlights & Features
  popularRoutesTitle: string;
  popularRoutesSubtitle: string;
  whyChooseTitle: string;
  whyChooseSubtitle: string;
  instantBookingTitle: string;
  instantBookingDesc: string;
  securePaymentsTitle: string;
  securePaymentsDesc: string;
  liveTrackingTitle: string;
  liveTrackingDesc: string;
  multilingualTitle: string;
  multilingualDesc: string;
  helplineBanner: string;
  helplineCall: string;

  // Train Search & Results
  trainResultsTitle: string;
  trainsFound: string;
  modifySearch: string;
  filtersTitle: string;
  filterDeparture: string;
  filterArrival: string;
  filterClasses: string;
  filterTrainType: string;
  earlyMorning: string; // 00:00 - 06:00
  morning: string;      // 06:00 - 12:00
  afternoon: string;    // 12:00 - 18:00
  night: string;        // 18:00 - 24:00
  available: string;
  waitingList: string;
  rac: string;
  bookNow: string;
  duration: string;
  runsOn: string;
  pantry: string;
  noPantry: string;
  noTrainsFound: string;
  noTrainsDesc: string;
  viewSchedule: string;

  // Booking Flow
  bookingTitle: string;
  trainDetails: string;
  passengerDetailsTitle: string;
  passengerName: string;
  passengerAge: string;
  passengerGender: string;
  berthPreference: string;
  addPassenger: string;
  removePassenger: string;
  maxPassengersNote: string;
  fareBreakdown: string;
  baseFare: string;
  reservationCharge: string;
  superfastCharge: string;
  gstCharge: string;
  totalAmount: string;
  confirmBooking: string;
  bookingSuccessTitle: string;
  bookingSuccessDesc: string;
  viewTicket: string;
  male: string;
  female: string;
  transgender: string;
  lowerBerth: string;
  middleBerth: string;
  upperBerth: string;
  sideLower: string;
  sideUpper: string;
  windowSeat: string;
  noPreference: string;

  // My Bookings
  myBookingsTitle: string;
  myBookingsSubtitle: string;
  noBookingsFound: string;
  noBookingsDesc: string;
  pnrNumber: string;
  bookingStatus: string;
  statusConfirmed: string;
  statusCancelled: string;
  statusWaiting: string;
  downloadTicket: string;
  printTicket: string;
  cancelTicket: string;
  confirmCancelModalTitle: string;
  confirmCancelModalDesc: string;
  refundNotice: string;
  yesCancelTicket: string;
  keepTicket: string;

  // PNR Status
  pnrStatusTitle: string;
  pnrStatusSubtitle: string;
  enterPnrPlaceholder: string;
  checkStatusButton: string;
  samplePnrHint: string;
  pnrNotFoundTitle: string;
  pnrNotFoundDesc: string;
  chartingStatus: string;
  chartPrepared: string;
  coach: string;
  berthSeat: string;
  currentStatus: string;
  bookingTime: string;

  // Auth (Login & Register)
  loginTitle: string;
  loginSubtitle: string;
  emailOrMobile: string;
  password: string;
  rememberMe: string;
  signInButton: string;
  noAccountPrompt: string;
  registerHere: string;
  registerTitle: string;
  registerSubtitle: string;
  fullName: string;
  mobileNumber: string;
  emailAddress: string;
  confirmPassword: string;
  selectGender: string;
  createAccountButton: string;
  alreadyHaveAccount: string;
  loginHere: string;
  passwordStrengthWeak: string;
  passwordStrengthMedium: string;
  passwordStrengthStrong: string;
  passwordsMustMatch: string;
  authRequiredToBook: string;
  loginSuccess: string;
  registerSuccess: string;
  invalidCredentials: string;

  // Footer
  footerDesc: string;
  quickLinks: string;
  railServices: string;
  contactSupport: string;
  disclaimer: string;
  allRightsReserved: string;
  viewAngularCode: string;

  // Seat Map Visualization
  interactiveSeatMap: string;
  seatMapSubtitle: string;
  selectSeatForPassenger: string;
  seatSelected: string;
  seatAvailable: string;
  seatBooked: string;
  coachAisle: string;
  coachWindow: string;
  autoAssignRemaining: string;
  clearSeatSelection: string;
}

export const translations: Record<SupportedLanguage, Translations> = {
  en: {
    brandName: 'RailConnect',
    brandTagline: 'Indian Railways Reservation Clone Portal',
    navHome: 'Home',
    navSearch: 'Train Search',
    navPnrStatus: 'PNR Status',
    navMyBookings: 'My Bookings',
    navLogin: 'Login',
    navRegister: 'Register',
    navLogout: 'Logout',
    navWelcome: 'Welcome',

    heroTitle: 'Your Journey Begins Here',
    heroSubtitle: 'Book your train tickets easily, quickly and securely across India.',
    fromStation: 'From Station',
    toStation: 'To Station',
    journeyDate: 'Journey Date',
    travelClass: 'Travel Class',
    quota: 'Quota',
    searchTrains: 'Search Trains',
    swapStations: 'Swap Stations',
    allClasses: 'All Classes',
    generalQuota: 'General (GN)',
    tatkalQuota: 'Tatkal (TQ)',
    ladiesQuota: 'Ladies (LD)',
    seniorCitizenQuota: 'Senior Citizen (SS)',

    popularRoutesTitle: 'Popular Railway Routes',
    popularRoutesSubtitle: 'Fast, comfortable and high-speed express trains between major tech and heritage corridors',
    whyChooseTitle: 'Why Choose RailConnect?',
    whyChooseSubtitle: 'Next-generation railway ticketing engineered for seamless journeys',
    instantBookingTitle: 'Fast Ticket Booking',
    instantBookingDesc: 'Instant seat availability, live booking and seamless IRCTC-grade transaction flows.',
    securePaymentsTitle: '100% Secure Checkout',
    securePaymentsDesc: 'Multi-layer encrypted payments supporting UPI, Cards, Net Banking and IRCTC iPay.',
    liveTrackingTitle: 'Real-time PNR Tracking',
    liveTrackingDesc: 'Instant status verification, seat allocation, and live chart preparation tracking.',
    multilingualTitle: 'Multilingual Support',
    multilingualDesc: 'Full localization in English, Telugu (తెలుగు) and Hindi (हिंदी) with Indian numbering.',
    helplineBanner: 'Indian Railway Helpline 139 - For Medical, Security & General Inquiries',
    helplineCall: 'Toll-Free 24x7',

    trainResultsTitle: 'Available Trains',
    trainsFound: 'train(s) found on this route',
    modifySearch: 'Modify Search',
    filtersTitle: 'Filter Trains',
    filterDeparture: 'Departure Time',
    filterArrival: 'Arrival Time',
    filterClasses: 'Travel Classes',
    filterTrainType: 'Train Types',
    earlyMorning: 'Early Morning (00:00 - 06:00)',
    morning: 'Morning (06:00 - 12:00)',
    afternoon: 'Afternoon (12:00 - 18:00)',
    night: 'Night (18:00 - 24:00)',
    available: 'Available',
    waitingList: 'Waiting List',
    rac: 'Reservation Against Cancellation',
    bookNow: 'Book Now',
    duration: 'Duration',
    runsOn: 'Runs On',
    pantry: 'Pantry Car Available',
    noPantry: 'No Pantry Car',
    noTrainsFound: 'No Direct Trains Found',
    noTrainsDesc: 'Please try different source or destination stations or adjust your journey date.',
    viewSchedule: 'View Route Schedule',

    bookingTitle: 'Passenger Reservation & Booking',
    trainDetails: 'Train Details',
    passengerDetailsTitle: 'Passenger Details',
    passengerName: 'Passenger Full Name',
    passengerAge: 'Age',
    passengerGender: 'Gender',
    berthPreference: 'Berth Preference',
    addPassenger: '+ Add Passenger',
    removePassenger: 'Remove',
    maxPassengersNote: 'You can add up to 6 passengers per booking reservation.',
    fareBreakdown: 'Fare Summary',
    baseFare: 'Base Ticket Fare',
    reservationCharge: 'Reservation Charge',
    superfastCharge: 'Superfast Surcharge',
    gstCharge: 'GST (5%)',
    totalAmount: 'Total Payable Amount',
    confirmBooking: 'Proceed to Pay & Confirm Booking',
    bookingSuccessTitle: 'Booking Confirmed Successfully!',
    bookingSuccessDesc: 'Your electronic reservation slip has been generated and saved to your account.',
    viewTicket: 'View & Print Ticket',
    male: 'Male',
    female: 'Female',
    transgender: 'Transgender',
    lowerBerth: 'Lower Berth (LB)',
    middleBerth: 'Middle Berth (MB)',
    upperBerth: 'Upper Berth (UB)',
    sideLower: 'Side Lower (SL)',
    sideUpper: 'Side Upper (SU)',
    windowSeat: 'Window Seat (W)',
    noPreference: 'No Preference',

    myBookingsTitle: 'My Bookings & Tickets',
    myBookingsSubtitle: 'View, print, download, or cancel your booked train reservations.',
    noBookingsFound: 'No Bookings Found',
    noBookingsDesc: 'You have not booked any train tickets yet. Search for a train to begin your journey!',
    pnrNumber: 'PNR Number',
    bookingStatus: 'Status',
    statusConfirmed: 'CONFIRMED',
    statusCancelled: 'CANCELLED',
    statusWaiting: 'WAITING LIST',
    downloadTicket: 'Download Ticket',
    printTicket: 'Print ERS Ticket',
    cancelTicket: 'Cancel Ticket',
    confirmCancelModalTitle: 'Cancel Railway Reservation?',
    confirmCancelModalDesc: 'Are you sure you want to cancel this booking? Standard railway cancellation fees will apply.',
    refundNotice: 'Calculated refund will be credited back to your original payment method within 3-5 working days.',
    yesCancelTicket: 'Yes, Confirm Cancellation',
    keepTicket: 'Keep Ticket',

    pnrStatusTitle: 'Passenger Current Status Enquiry (PNR Status)',
    pnrStatusSubtitle: 'Enter your 10-digit PNR number to check current reservation status, coach and berth allocation.',
    enterPnrPlaceholder: 'Enter 10-Digit PNR Number (e.g. 4528192374)',
    checkStatusButton: 'Check PNR Status',
    samplePnrHint: 'Quick Test Demo PNR:',
    pnrNotFoundTitle: 'Sorry! No booking found for this PNR number.',
    pnrNotFoundDesc: 'Please verify the 10-digit PNR number on your ticket or check My Bookings section.',
    chartingStatus: 'Charting Status',
    chartPrepared: 'Chart Prepared (Final Allocation)',
    coach: 'Coach',
    berthSeat: 'Berth / Seat',
    currentStatus: 'Current Status',
    bookingTime: 'Booked On',

    loginTitle: 'Account Login',
    loginSubtitle: 'Enter your credentials to access tickets and make reservations.',
    emailOrMobile: 'Email ID or Mobile Number',
    password: 'Password',
    rememberMe: 'Remember Me',
    signInButton: 'Sign In',
    noAccountPrompt: "Don't have a RailConnect account?",
    registerHere: 'Register Now',
    registerTitle: 'Create an Account',
    registerSubtitle: 'Join RailConnect for fast, easy and secure train bookings across India.',
    fullName: 'Full Name',
    mobileNumber: 'Mobile Number (10 digits)',
    emailAddress: 'Email Address',
    confirmPassword: 'Confirm Password',
    selectGender: 'Select Gender',
    createAccountButton: 'Create RailConnect Account',
    alreadyHaveAccount: 'Already registered with RailConnect?',
    loginHere: 'Log in here',
    passwordStrengthWeak: 'Weak password (minimum 6 chars)',
    passwordStrengthMedium: 'Medium password',
    passwordStrengthStrong: 'Strong password',
    passwordsMustMatch: 'Passwords do not match',
    authRequiredToBook: 'Please log in or register to complete your ticket booking.',
    loginSuccess: 'Logged in successfully!',
    registerSuccess: 'Account created successfully! You are now logged in.',
    invalidCredentials: 'Invalid email/mobile or password. Please try again.',

    footerDesc: 'RailConnect is an advanced Indian Railway passenger reservation clone system inspired by the IRCTC portal, featuring modern responsive UI, multi-language support, real-time availability and PNR tracking.',
    quickLinks: 'Quick Links',
    railServices: 'Railway Services',
    contactSupport: 'Customer Support',
    disclaimer: 'Inspired by IRCTC & Indian Railways. Designed for high performance, accessibility and university demonstration.',
    allRightsReserved: 'RailConnect Reservation System. All rights reserved.',
    viewAngularCode: 'Angular Architecture & Source Code',

    interactiveSeatMap: 'Interactive Coach Seat Map',
    seatMapSubtitle: 'Select your preferred seats & berths on the train layout',
    selectSeatForPassenger: 'Click an available seat to assign to',
    seatSelected: 'Selected',
    seatAvailable: 'Available',
    seatBooked: 'Booked / Reserved',
    coachAisle: 'Aisle Pathway',
    coachWindow: 'Window',
    autoAssignRemaining: 'Auto-Assign Remaining Seats',
    clearSeatSelection: 'Clear Seat Selections'
  },

  te: {
    brandName: 'రైల్ కనెక్ట్ (RailConnect)',
    brandTagline: 'ఐఆర్‌సిటిసి ఆధారిత భారతీయ రైల్వే రిజర్వేషన్ పోర్టల్',
    navHome: 'హోమ్',
    navSearch: 'రైలు శోధన',
    navPnrStatus: 'పిఎన్ఆర్ స్టేటస్',
    navMyBookings: 'నా బుకింగ్స్',
    navLogin: 'లాగిన్',
    navRegister: 'రిజిస్టర్',
    navLogout: 'లాగ్అవుట్',
    navWelcome: 'స్వాగతం',

    heroTitle: 'మీ ప్రయాణం ఇక్కడే ప్రారంభమవుతుంది',
    heroSubtitle: 'భారతదేశం అంతటా మీ రైలు టిక్కెట్లను సులభంగా, వేగంగా మరియు సురక్షితంగా బుక్ చేసుకోండి.',
    fromStation: 'బయలుదేరే స్టేషన్ (From)',
    toStation: 'చేరుకునే స్టేషన్ (To)',
    journeyDate: 'ప్రయాణ తేదీ',
    travelClass: 'ప్రయాణ తరగతి',
    quota: 'కోటా',
    searchTrains: 'రైళ్లను శోధించండి',
    swapStations: 'స్టేషన్లు మార్చండి',
    allClasses: 'అన్ని తరగతులు',
    generalQuota: 'జనరల్ కోటా (GN)',
    tatkalQuota: 'తత్కాల్ కోటా (TQ)',
    ladiesQuota: 'మహిళా కోటా (LD)',
    seniorCitizenQuota: 'సీనియర్ సిటిజన్ (SS)',

    popularRoutesTitle: 'ప్రసిద్ధ రైలు మార్గాలు',
    popularRoutesSubtitle: 'ప్రధాన సాంకేతిక మరియు చారిత్రక నగరాల మధ్య వేగవంతమైన ఎక్స్‌ప్రెస్ రైళ్లు',
    whyChooseTitle: 'రైల్ కనెక్ట్‌ను ఎందుకు ఎంచుకోవాలి?',
    whyChooseSubtitle: 'సరళమైన మరియు వేగవంతమైన రైలు ప్రయాణాల కోసం ఆధునిక సాంకేతికత',
    instantBookingTitle: 'వేగవంతమైన టిక్కెట్ బుకింగ్',
    instantBookingDesc: 'తక్షణ సీటు లభ్యత, లైవ్ బుకింగ్ మరియు ఐఆర్‌సిటిసి తరహా చెల్లింపులు.',
    securePaymentsTitle: '100% సురక్షిత చెల్లింపులు',
    securePaymentsDesc: 'UPI, డెబిట్/క్రెడిట్ కార్డ్‌లు మరియు నెట్ బ్యాంకింగ్‌తో పూర్తి భద్రత.',
    liveTrackingTitle: 'లైవ్ పిఎన్ఆర్ స్థితి',
    liveTrackingDesc: 'తక్షణ టికెట్ ధృవీకరణ, సీటు వివరాలు మరియు చార్ట్ స్థితి పరిశీలన.',
    multilingualTitle: 'బహుభాషా మద్దతు',
    multilingualDesc: 'తెలుగు, హిందీ మరియు ఆంగ్ల భాషలలో స్థానిక కరెన్సీ (₹) మరియు తేదీ ఫార్మాట్‌లు.',
    helplineBanner: 'భారతీయ రైల్వే హెల్ప్‌లైన్ 139 - వైద్య, భద్రతా మరియు సాధారణ సమాచారం కోసం',
    helplineCall: 'టోల్ ఫ్రీ 24x7',

    trainResultsTitle: 'లభ్యత గల రైళ్లు',
    trainsFound: 'రైళ్లు అందుబాటులో ఉన్నాయి',
    modifySearch: 'శోధన మార్చండి',
    filtersTitle: 'రైళ్లను ఫిల్టర్ చేయండి',
    filterDeparture: 'బయలుదేరే సమయం',
    filterArrival: 'చేరుకునే సమయం',
    filterClasses: 'తరగతులు',
    filterTrainType: 'రైలు రకాలు',
    earlyMorning: 'తెల్లవారుజామున (00:00 - 06:00)',
    morning: 'ఉదయం (06:00 - 12:00)',
    afternoon: 'మధ్యాహ్నం (12:00 - 18:00)',
    night: 'రాత్రి (18:00 - 24:00)',
    available: 'అందుబాటులో ఉంది',
    waitingList: 'వెయిటింగ్ లిస్ట్',
    rac: 'ఆర్.ఎ.సి (RAC)',
    bookNow: 'ఇప్పుడే బుక్ చేయండి',
    duration: 'ప్రయాణ సమయం',
    runsOn: 'నడిచే రోజులు',
    pantry: 'ప్యాంట్రీ సదుపాయం కలదు',
    noPantry: 'ప్యాంట్రీ సదుపాయం లేదు',
    noTrainsFound: 'నేరుగా రైళ్లు కనుగొనబడలేదు',
    noTrainsDesc: 'దయచేసి ఇతర స్టేషన్లను ఎంచుకోండి లేదా ప్రయాణ తేదీని మార్చండి.',
    viewSchedule: 'రైలు మార్గం చూడండి',

    bookingTitle: 'ప్రయాణీకుల రిజర్వేషన్ & బుకింగ్',
    trainDetails: 'రైలు వివరాలు',
    passengerDetailsTitle: 'ప్రయాణీకుల వివరాలు',
    passengerName: 'ప్రయాణీకుడి పూర్తి పేరు',
    passengerAge: 'వయస్సు',
    passengerGender: 'లింగం',
    berthPreference: 'బెర్త్ ప్రాధాన్యత',
    addPassenger: '+ ప్రయాణీకుడిని జోడించండి',
    removePassenger: 'తొలగించండి',
    maxPassengersNote: 'ఒక రిజర్వేషన్‌లో గరిష్టంగా 6 మంది ప్రయాణీకులను చేర్చవచ్చు.',
    fareBreakdown: 'ఛార్జీల వివరాలు',
    baseFare: 'ప్రాథమిక టికెట్ ఛార్జీ',
    reservationCharge: 'రిజర్వేషన్ రుసుము',
    superfastCharge: 'సూపర్‌ఫాస్ట్ ఛార్జీ',
    gstCharge: 'జిఎస్‌టి (5%)',
    totalAmount: 'మొత్తం చెల్లించవలసిన మొత్తం',
    confirmBooking: 'చెల్లింపు చేసి టికెట్ నిర్ధారించండి',
    bookingSuccessTitle: 'బుకింగ్ విజయవంతంగా నిర్ధారించబడింది!',
    bookingSuccessDesc: 'మీ ఎలక్ట్రానిక్ రిజర్వేషన్ స్లిప్ రూపొందించబడింది మరియు మీ ఖాతాలో భద్రపరచబడింది.',
    viewTicket: 'టికెట్ చూడండి & ప్రింట్ చేయండి',
    male: 'పురుషుడు',
    female: 'స్త్రీ',
    transgender: 'ఇతర',
    lowerBerth: 'లోయర్ బెర్త్ (LB)',
    middleBerth: 'మిడిల్ బెర్త్ (MB)',
    upperBerth: 'అప్పర్ బెర్త్ (UB)',
    sideLower: 'సైడ్ లోయర్ (SL)',
    sideUpper: 'సైడ్ అప్పర్ (SU)',
    windowSeat: 'విండో సీటు (W)',
    noPreference: 'ప్రాధాన్యత లేదు',

    myBookingsTitle: 'నా బుకింగ్స్ మరియు టిక్కెట్లు',
    myBookingsSubtitle: 'మీరు బుక్ చేసిన రైలు టిక్కెట్లను వీక్షించండి, డౌన్‌లోడ్ చేయండి లేదా రద్దు చేయండి.',
    noBookingsFound: 'ఎలాంటి బుకింగ్స్ లేవు',
    noBookingsDesc: 'మీరు ఇంకా ఎలాంటి టిక్కెట్లు బుక్ చేసుకోలేదు. మీ ప్రయాణాన్ని ప్రారంభించడానికి రైలు శోధించండి!',
    pnrNumber: 'పిఎన్ఆర్ సంఖ్య',
    bookingStatus: 'స్థితి',
    statusConfirmed: 'ధృవీకరించబడింది (CONFIRMED)',
    statusCancelled: 'రద్దు చేయబడింది (CANCELLED)',
    statusWaiting: 'వెయిటింగ్ లిస్ట్ (WL)',
    downloadTicket: 'టికెట్ డౌన్‌లోడ్',
    printTicket: 'టికెట్ ప్రింట్ చేయండి',
    cancelTicket: 'టికెట్ రద్దు చేయండి',
    confirmCancelModalTitle: 'రైలు టికెట్ రద్దు చేయాలనుకుంటున్నారా?',
    confirmCancelModalDesc: 'ఈ టికెట్ రద్దు చేయాలని మీరు నిశ్చయించుకున్నారా? రైల్వే నిబంధనల ప్రకారం రద్దు రుసుము వర్తిస్తుంది.',
    refundNotice: 'లెక్కించబడిన వాపసు మొత్తం 3-5 పనిదినాలలో మీ ఖాతాకు జమ చేయబడుతుంది.',
    yesCancelTicket: 'అవును, రద్దును నిర్ధారించండి',
    keepTicket: 'టికెట్ ఉంచండి',

    pnrStatusTitle: 'ప్రయాణీకుల ప్రస్తుత స్థితి విచారణ (PNR Status)',
    pnrStatusSubtitle: 'మీ 10 అంకెల పిఎన్ఆర్ సంఖ్యను నమోదు చేసి ప్రస్తుత బెర్త్ మరియు సీటు వివరాలను తెలుసుకోండి.',
    enterPnrPlaceholder: '10 అంకెల పిఎన్ఆర్ నంబర్ నమోదు చేయండి (ఉదా: 4528192374)',
    checkStatusButton: 'పిఎన్ఆర్ స్థితిని తనిఖీ చేయండి',
    samplePnrHint: 'పరీక్షించడానికి నమూనా పిఎన్ఆర్:',
    pnrNotFoundTitle: 'క్షమించండి! ఈ పిఎన్ఆర్ సంఖ్యతో ఎటువంటి బుకింగ్ కనుగొనబడలేదు.',
    pnrNotFoundDesc: 'దయచేసి మీ టిక్కెట్‌పై ఉన్న 10 అంకెల పిఎన్ఆర్ సంఖ్యను సరిచూసుకోండి.',
    chartingStatus: 'చార్టింగ్ స్థితి',
    chartPrepared: 'చార్ట్ సిద్ధం చేయబడింది (తుది సీటు కేటాయింపు)',
    coach: 'కోచ్',
    berthSeat: 'బెర్త్ / సీటు',
    currentStatus: 'ప్రస్తుత స్థితి',
    bookingTime: 'బుక్ చేసిన సమయం',

    loginTitle: 'ఖాతా లాగిన్',
    loginSubtitle: 'మీ టిక్కెట్లను వీక్షించడానికి మరియు బుక్ చేయడానికి లాగిన్ అవ్వండి.',
    emailOrMobile: 'ఇమెయిల్ లేదా మొబైల్ సంఖ్య',
    password: 'పాస్‌వర్డ్',
    rememberMe: 'నన్ను గుర్తుంచుకో',
    signInButton: 'లాగిన్ అవ్వండి',
    noAccountPrompt: 'రైల్ కనెక్ట్ ఖాతా లేదా?',
    registerHere: 'ఇప్పుడే రిజిస్టర్ అవ్వండి',
    registerTitle: 'కొత్త ఖాతాను సృష్టించండి',
    registerSubtitle: 'సురక్షితమైన మరియు వేగవంతమైన రైలు ప్రయాణాల కోసం చేరండి.',
    fullName: 'పూర్తి పేరు',
    mobileNumber: 'మొబైల్ సంఖ్య (10 అంకెలు)',
    emailAddress: 'ఇమెయిల్ చిరునామా',
    confirmPassword: 'పాస్‌వర్డ్ నిర్ధారణ',
    selectGender: 'లింగం ఎంచుకోండి',
    createAccountButton: 'ఖాతా సృష్టించండి',
    alreadyHaveAccount: 'ఇప్పటికే ఖాతా ఉందా?',
    loginHere: 'ఇక్కడ లాగిన్ అవ్వండి',
    passwordStrengthWeak: 'బలహీనమైన పాస్‌వర్డ్ (కనీసం 6 అక్షరాలు)',
    passwordStrengthMedium: 'మధ్యస్థ పాస్‌వర్డ్',
    passwordStrengthStrong: 'బలమైన పాస్‌వర్డ్',
    passwordsMustMatch: 'పాస్‌వర్డ్‌లు సరిపోలడం లేదు',
    authRequiredToBook: 'టికెట్ బుకింగ్ పూర్తి చేయడానికి దయచేసి లాగిన్ అవ్వండి లేదా రిజిస్టర్ చేసుకోండి.',
    loginSuccess: 'విజయవంతంగా లాగిన్ అయ్యారు!',
    registerSuccess: 'ఖాతా విజయవంతంగా సృష్టించబడింది! మీరు ఇప్పుడు లాగిన్ అయ్యారు.',
    invalidCredentials: 'తప్పుడు వివరాలు. దయచేసి మళ్లీ ప్రయత్నించండి.',

    footerDesc: 'రైల్ కనెక్ట్ అనేది ఐఆర్‌సిటిసి పోర్టల్ స్ఫూర్తితో రూపొందించబడిన ఆధునిక భారతీయ రైల్వే ప్యాసింజర్ రిజర్వేషన్ వ్యవస్థ.',
    quickLinks: 'ముఖ్యమైన లింకులు',
    railServices: 'రైల్వే సేవలు',
    contactSupport: 'కస్టమర్ సపోర్ట్',
    disclaimer: 'ఐఆర్‌సిటిసి మరియు భారతీయ రైల్వేల స్ఫూర్తితో అత్యుత్తమ వినియోగదారు అనుభవం కోసం రూపొందించబడింది.',
    allRightsReserved: 'రైల్ కనెక్ట్ రిజర్వేషన్ సిస్టమ్. సర్వహక్కులు ప్రత్యేకించబడ్డాయి.',
    viewAngularCode: 'యాంగులర్ నిర్మాణం & సోర్స్ కోడ్',

    interactiveSeatMap: 'ఇంటరాక్టివ్ కోచ్ సీట్ మ్యాప్',
    seatMapSubtitle: 'కోచ్ లేఅవుట్ నుండి మీకు నచ్చిన సీట్ నంబర్ మరియు బెర్త్‌ను ఎంచుకోండి',
    selectSeatForPassenger: 'ప్రయాణీకుడికి సీటును కేటాయించడానికి అందుబాటులో ఉన్న సీటును క్లిక్ చేయండి',
    seatSelected: 'ఎంచుకోబడింది',
    seatAvailable: 'అందుబాటులో ఉంది',
    seatBooked: 'రిజర్వ్ చేయబడింది / బుక్ చేయబడింది',
    coachAisle: 'నడక మార్గం (Aisle)',
    coachWindow: 'విండో',
    autoAssignRemaining: 'మిగిలిన సీట్లను ఆటోమేటిక్‌గా కేటాయించండి',
    clearSeatSelection: 'ఎంపికను క్లియర్ చేయండి'
  },

  hi: {
    brandName: 'रेल कनेक्ट (RailConnect)',
    brandTagline: 'आईआरसीटीसी प्रेरित भारतीय रेल आरक्षण पोर्टल',
    navHome: 'होम',
    navSearch: 'ट्रेन खोजें',
    navPnrStatus: 'पीएनआर स्थिति',
    navMyBookings: 'मेरी बुकिंग',
    navLogin: 'लॉग इन',
    navRegister: 'पंजीकरण',
    navLogout: 'लॉग आउट',
    navWelcome: 'स्वागत है',

    heroTitle: 'आपकी यात्रा यहाँ से शुरू होती है',
    heroSubtitle: 'पूरे भारत में अपनी ट्रेन टिकट आसानी से, तेज़ी से और सुरक्षित रूप से बुक करें।',
    fromStation: 'प्रारंभिक स्टेशन (From)',
    toStation: 'गंतव्य स्टेशन (To)',
    journeyDate: 'यात्रा की तारीख',
    travelClass: 'यात्रा श्रेणी',
    quota: 'कोटा',
    searchTrains: 'ट्रेनें खोजें',
    swapStations: 'स्टेशनों को बदलें',
    allClasses: 'सभी श्रेणियां',
    generalQuota: 'सामान्य कोटा (GN)',
    tatkalQuota: 'तत्काल कोटा (TQ)',
    ladiesQuota: 'महिला कोटा (LD)',
    seniorCitizenQuota: 'वरिष्ठ नागरिक (SS)',

    popularRoutesTitle: 'लोकप्रिय रेल मार्ग',
    popularRoutesSubtitle: 'प्रमुख प्रौद्योगिकी और ऐतिहासिक शहरों के बीच तेज़ और आरामदायक एक्सप्रेस ट्रेनें',
    whyChooseTitle: 'रेल कनेक्ट क्यों चुनें?',
    whyChooseSubtitle: 'सहज और सुविधाजनक रेल यात्रा के लिए अगली पीढ़ी का टिकटिंग सिस्टम',
    instantBookingTitle: 'तेज़ टिकट बुकिंग',
    instantBookingDesc: 'तत्काल सीट उपलब्धता, लाइव बुकिंग और आईआरसीटीसी स्तर का सुरक्षित भुगतान प्रवाह।',
    securePaymentsTitle: '100% सुरक्षित भुगतान',
    securePaymentsDesc: 'UPI, क्रेडिट/डेबिट कार्ड और नेट बैंकिंग के साथ बहुस्तरीय एन्क्रिप्टेड भुगतान।',
    liveTrackingTitle: 'रीयल-टाइम पीएनआर ट्रैकिंग',
    liveTrackingDesc: 'तत्काल आरक्षण स्थिति, कोच और बर्थ आवंटन, एवं लाइव चार्ट तैयारी की जांच।',
    multilingualTitle: 'बहुभाषी सहायता',
    multilingualDesc: 'अंग्रेजी, तेलुगु और हिंदी में भारतीय मुद्रा (₹) एवं दिनांक प्रारूप के साथ पूर्ण समर्थन।',
    helplineBanner: 'भारतीय रेल हेल्पलाइन 139 - सुरक्षा, चिकित्सा एवं सामान्य सहायता हेतु 24x7 उपलब्ध',
    helplineCall: 'टोल-फ्री 24x7',

    trainResultsTitle: 'उपलब्ध ट्रेनें',
    trainsFound: 'ट्रेनें इस मार्ग पर उपलब्ध हैं',
    modifySearch: 'खोज संशोधित करें',
    filtersTitle: 'ट्रेनें फ़िल्टर करें',
    filterDeparture: 'प्रस्थान समय',
    filterArrival: 'आगमन समय',
    filterClasses: 'यात्रा श्रेणियां',
    filterTrainType: 'ट्रेन के प्रकार',
    earlyMorning: 'प्रातःकाल (00:00 - 06:00)',
    morning: 'सुबह (06:00 - 12:00)',
    afternoon: 'दोपहर (12:00 - 18:00)',
    night: 'रात (18:00 - 24:00)',
    available: 'उपलब्ध',
    waitingList: 'प्रतीक्षा सूची (WL)',
    rac: 'आरएसी (RAC)',
    bookNow: 'अभी बुक करें',
    duration: 'समय अवधि',
    runsOn: 'चलने के दिन',
    pantry: 'पैंट्री कार उपलब्ध',
    noPantry: 'पैंट्री कार उपलब्ध नहीं',
    noTrainsFound: 'कोई सीधी ट्रेन नहीं मिली',
    noTrainsDesc: 'कृपया अलग स्टेशन चुनें या यात्रा की तारीख बदलकर पुनः प्रयास करें।',
    viewSchedule: 'ट्रेन मार्ग समय सारणी',

    bookingTitle: 'यात्री आरक्षण एवं टिकट बुकिंग',
    trainDetails: 'ट्रेन विवरण',
    passengerDetailsTitle: 'यात्री का विवरण',
    passengerName: 'यात्री का पूरा नाम',
    passengerAge: 'आयु',
    passengerGender: 'लिंग',
    berthPreference: 'बर्थ प्राथमिकता',
    addPassenger: '+ यात्री जोड़ें',
    removePassenger: 'हटाएं',
    maxPassengersNote: 'एक आरक्षण में अधिकतम 6 यात्रियों को जोड़ा जा सकता है।',
    fareBreakdown: 'किराया विवरण',
    baseFare: 'मूल टिकट किराया',
    reservationCharge: 'आरक्षण शुल्क',
    superfastCharge: 'सुपरफास्ट प्रभार',
    gstCharge: 'जीएसटी (5%)',
    totalAmount: 'कुल देय राशि',
    confirmBooking: 'भुगतान करें और टिकट पक्का करें',
    bookingSuccessTitle: 'बुकिंग सफलतापूर्वक पक्की हो गई!',
    bookingSuccessDesc: 'आपकी इलेक्ट्रॉनिक आरक्षण पर्ची (ERS) तैयार कर आपके खाते में सहेज दी गई है।',
    viewTicket: 'टिकट देखें एवं प्रिंट करें',
    male: 'पुरुष',
    female: 'महिला',
    transgender: 'अन्य',
    lowerBerth: 'निचला बर्थ (LB)',
    middleBerth: 'मध्य बर्थ (MB)',
    upperBerth: 'ऊपरी बर्थ (UB)',
    sideLower: 'साइड लोअर (SL)',
    sideUpper: 'साइड अपर (SU)',
    windowSeat: 'खिड़की सीट (W)',
    noPreference: 'कोई प्राथमिकता नहीं',

    myBookingsTitle: 'मेरी बुकिंग और टिकट',
    myBookingsSubtitle: 'अपने आरक्षित रेल टिकट देखें, डाउनलोड करें, प्रिंट करें या रद्द करें।',
    noBookingsFound: 'कोई बुकिंग नहीं मिली',
    noBookingsDesc: 'आपने अभी तक कोई ट्रेन टिकट बुक नहीं किया है। अपनी यात्रा शुरू करने के लिए ट्रेन खोजें!',
    pnrNumber: 'पीएनआर संख्या',
    bookingStatus: 'स्थिति',
    statusConfirmed: 'पुष्ट (CONFIRMED)',
    statusCancelled: 'रद्द (CANCELLED)',
    statusWaiting: 'प्रतीक्षा सूची (WL)',
    downloadTicket: 'टिकट डाउनलोड',
    printTicket: 'टिकट प्रिंट करें',
    cancelTicket: 'टिकट रद्द करें',
    confirmCancelModalTitle: 'क्या आप रेल टिकट रद्द करना चाहते हैं?',
    confirmCancelModalDesc: 'क्या आप निश्चित रूप से इस बुकिंग को रद्द करना चाहते हैं? रेलवे नियमों के अनुसार कैंसिलेशन शुल्क काटा जाएगा।',
    refundNotice: 'गणना की गई रिफंड राशि 3-5 कार्य दिवसों में आपके मूल खाते में वापस भेज दी जाएगी।',
    yesCancelTicket: 'हाँ, रद्दीकरण की पुष्टि करें',
    keepTicket: 'टिकट सुरक्षित रखें',

    pnrStatusTitle: 'यात्री वर्तमान स्थिति पूछताछ (PNR Status)',
    pnrStatusSubtitle: 'वर्तमान आरक्षण स्थिति, कोच और सीट आवंटन जानने के लिए अपना 10 अंकों का पीएनआर नंबर दर्ज करें।',
    enterPnrPlaceholder: '10 अंकों का पीएनआर नंबर दर्ज करें (उदा: 4528192374)',
    checkStatusButton: 'पीएनआर स्थिति जांचें',
    samplePnrHint: 'परीक्षण हेतु नमूना पीएनआर:',
    pnrNotFoundTitle: 'क्षमा करें! इस पीएनआर नंबर के लिए कोई बुकिंग नहीं मिली।',
    pnrNotFoundDesc: 'कृपया अपने टिकट पर मुद्रित 10 अंकों का पीएनआर नंबर जांचें या मेरी बुकिंग में देखें।',
    chartingStatus: 'चार्ट स्थिति',
    chartPrepared: 'चार्ट तैयार है (अंतिम आवंटन)',
    coach: 'कोच',
    berthSeat: 'बर्थ / सीट',
    currentStatus: 'वर्तमान स्थिति',
    bookingTime: 'बुकिंग का समय',

    loginTitle: 'खाता लॉगिन',
    loginSubtitle: 'टिकट देखने और आरक्षण करने के लिए अपना विवरण दर्ज करें।',
    emailOrMobile: 'ईमेल या मोबाइल नंबर',
    password: 'पासवर्ड',
    rememberMe: 'मुझे याद रखें',
    signInButton: 'लॉग इन करें',
    noAccountPrompt: 'क्या आपके पास रेल कनेक्ट खाता नहीं है?',
    registerHere: 'अभी पंजीकरण करें',
    registerTitle: 'नया खाता बनाएं',
    registerSubtitle: 'तेज़, सुरक्षित और आसान रेल यात्रा बुकिंग के लिए रेल कनेक्ट से जुड़ें।',
    fullName: 'पूरा नाम',
    mobileNumber: 'मोबाइल नंबर (10 अंक)',
    emailAddress: 'ईमेल पता',
    confirmPassword: 'पासवर्ड की पुष्टि करें',
    selectGender: 'लिंग चुनें',
    createAccountButton: 'रेल कनेक्ट खाता बनाएं',
    alreadyHaveAccount: 'पहले से पंजीकृत हैं?',
    loginHere: 'यहाँ लॉग इन करें',
    passwordStrengthWeak: 'कमजोर पासवर्ड (न्यूनतम 6 अक्षर)',
    passwordStrengthMedium: 'मध्यम पासवर्ड',
    passwordStrengthStrong: 'मजबूत पासवर्ड',
    passwordsMustMatch: 'पासवर्ड मेल नहीं खाते',
    authRequiredToBook: 'टिकट बुकिंग पूरी करने के लिए कृपया लॉग इन करें या नया खाता बनाएं।',
    loginSuccess: 'सफलतापूर्वक लॉग इन हुआ!',
    registerSuccess: 'खाता सफलतापूर्वक बनाया गया! अब आप लॉग इन हैं।',
    invalidCredentials: 'अमान्य विवरण। कृपया पुनः प्रयास करें।',

    footerDesc: 'रेल कनेक्ट आईआरसीटीसी पोर्टल से प्रेरित एक उन्नत भारतीय रेल यात्री आरक्षण प्रणाली क्लोन है।',
    quickLinks: 'त्वरित लिंक',
    railServices: 'रेल सेवाएं',
    contactSupport: 'ग्राहक सहायता',
    disclaimer: 'आईआरसीटीसी और भारतीय रेल से प्रेरित। उच्च प्रदर्शन एवं विश्वविद्यालय प्रदर्शन हेतु निर्मित।',
    allRightsReserved: 'रेल कनेक्ट आरक्षण प्रणाली। सर्वाधिकार सुरक्षित।',
    viewAngularCode: 'एंगुलर आर्किटेक्चर एवं सोर्स कोड',

    interactiveSeatMap: 'इंटरैक्टिव कोच सीट मैप',
    seatMapSubtitle: 'कोच लेआउट से अपनी पसंदीदा सीट और बर्थ चुनें',
    selectSeatForPassenger: 'यात्री को आवंटित करने के लिए उपलब्ध सीट पर क्लिक करें',
    seatSelected: 'चयनित (Selected)',
    seatAvailable: 'उपलब्ध (Available)',
    seatBooked: 'आरक्षित / बुक (Booked)',
    coachAisle: 'गलियारा (Aisle)',
    coachWindow: 'खिड़की (Window)',
    autoAssignRemaining: 'शेष सीटें स्वतः आवंटित करें',
    clearSeatSelection: 'सीट चयन हटाएं'
  }
};

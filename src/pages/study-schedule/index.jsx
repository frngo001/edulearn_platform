import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';
import ContextualHeader from 'components/ui/ContextualHeader';
import BottomTabNavigation from 'components/ui/BottomTabNavigation';
import NavigationBridge from 'components/ui/NavigationBridge';
import StudySessionOverlay from 'components/ui/StudySessionOverlay';

const StudySchedule = () => {
  const [viewMode, setViewMode] = useState('week'); // week, day
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [events, setEvents] = useState([]);

  const daysOfWeek = [
    { id: 'monday', label: 'Mo', fullName: 'Montag' },
    { id: 'tuesday', label: 'Di', fullName: 'Dienstag' },
    { id: 'wednesday', label: 'Mi', fullName: 'Mittwoch' },
    { id: 'thursday', label: 'Do', fullName: 'Donnerstag' },
    { id: 'friday', label: 'Fr', fullName: 'Freitag' },
    { id: 'saturday', label: 'Sa', fullName: 'Samstag' },
    { id: 'sunday', label: 'So', fullName: 'Sonntag' }
  ];

  const timeSlots = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00'
  ];

  // Mock events data
  const mockEvents = [
    {
      id: 1,
      title: 'JavaScript Grundlagen',
      time: '09:00',
      duration: 60,
      day: 'monday',
      subject: 'JavaScript',
      type: 'lesson',
      description: 'Variablen und Funktionen lernen'
    },
    {
      id: 2,
      title: 'React Komponenten',
      time: '14:00',
      duration: 90,
      day: 'tuesday',
      subject: 'React',
      type: 'lesson',
      description: 'Komponenten-Architektur verstehen'
    },
    {
      id: 3,
      title: 'Python Übungen',
      time: '10:00',
      duration: 45,
      day: 'wednesday',
      subject: 'Python',
      type: 'practice',
      description: 'Coding Challenges lösen'
    }
  ];

  useEffect(() => {
    setEvents(mockEvents);
  }, []);

  const handleAddEvent = (eventData) => {
    const newEvent = {
      id: Date.now(),
      ...eventData
    };
    setEvents([...events, newEvent]);
    setShowAddEventModal(false);
  };

  const getEventsForDay = (dayId) => {
    return events.filter(event => event.day === dayId);
  };

  const getEventTypeColor = (type) => {
    const colors = {
      lesson: 'bg-blue-100 text-blue-800 border-blue-200',
      practice: 'bg-green-100 text-green-800 border-green-200',
      review: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      exam: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[type] || colors.lesson;
  };

  return (
    <div className="min-h-screen bg-background dark:bg-dark-background">
      <ContextualHeader />
      
      <main className="pt-16 pb-20 md:pb-4 md:pl-16">
        <div className="p-4 space-y-6 max-w-7xl mx-auto md:p-6 lg:p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-2 hidden md:block"
          >
            <h1 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary md:text-3xl">
              Stundenplan
            </h1>
            <p className="text-text-secondary dark:text-dark-text-secondary">
              Plane und organisiere deine Lernzeiten effizient
            </p>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0"
          >
            {/* View Mode Selector */}
            <div className="bg-surface dark:bg-dark-surface rounded-2xl p-1 border border-border/20 dark:border-dark-border/20">
              <div className="flex">
                <button
                  onClick={() => setViewMode('week')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 md:px-6 ${
                    viewMode === 'week'
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary'
                  }`}
                >
                  Wochenansicht
                </button>
                <button
                  onClick={() => setViewMode('day')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 md:px-6 ${
                    viewMode === 'day'
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary'
                  }`}
                >
                  Tagesansicht
                </button>
              </div>
            </div>

            {/* Add Event Button */}
            <button
              onClick={() => setShowAddEventModal(true)}
              className="inline-flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-xl font-medium hover:bg-primary/90 transition-colors active:scale-95"
            >
              <Icon name="Plus" size={16} />
              <span>Termin hinzufügen</span>
            </button>
          </motion.div>

          {/* Schedule View */}
          <div className="space-y-6">
            {viewMode === 'week' ? (
              // Week View
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="bg-surface dark:bg-dark-surface rounded-2xl p-4 border border-border/20 dark:border-dark-border/20 md:p-6"
              >
                <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary mb-4">
                  Wochenübersicht
                </h3>
                
                {/* Mobile: Card-based layout */}
                <div className="space-y-4 md:hidden">
                  {daysOfWeek.map((day, index) => {
                    const dayEvents = getEventsForDay(day.id);
                    return (
                      <motion.div
                        key={day.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-surface-secondary dark:bg-dark-surface-secondary rounded-xl p-4 border border-border/10 dark:border-dark-border/10"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-text-primary dark:text-dark-text-primary">
                            {day.fullName}
                          </h4>
                          <span className="text-sm text-text-tertiary dark:text-dark-text-tertiary">
                            {dayEvents.length} Termine
                          </span>
                        </div>
                        
                        {dayEvents.length > 0 ? (
                          <div className="space-y-2">
                            {dayEvents.map((event, eventIndex) => (
                              <div
                                key={event.id}
                                className={`p-3 rounded-lg border transition-all duration-200 active:scale-95 ${getEventTypeColor(event.type)}`}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <h5 className="font-medium text-sm">{event.title}</h5>
                                    <p className="text-xs opacity-75 mt-1">{event.description}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-xs font-medium">{event.time}</p>
                                    <p className="text-xs opacity-75">{event.duration}min</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-4">
                            <Icon name="Calendar" size={24} className="mx-auto mb-2 text-text-tertiary dark:text-dark-text-tertiary" />
                            <p className="text-sm text-text-tertiary dark:text-dark-text-tertiary">
                              Keine Termine geplant
                            </p>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Desktop: Grid layout */}
                <div className="hidden md:block overflow-x-auto">
                  <div className="min-w-full">
                    {/* Header */}
                    <div className="grid grid-cols-8 gap-2 mb-4">
                      <div className="text-sm font-medium text-text-secondary dark:text-dark-text-secondary p-2">
                        Zeit
                      </div>
                      {daysOfWeek.map(day => (
                        <div key={day.id} className="text-sm font-medium text-text-secondary dark:text-dark-text-secondary p-2 text-center">
                          {day.label}
                        </div>
                      ))}
                    </div>

                    {/* Time slots */}
                    <div className="space-y-1">
                      {timeSlots.map(time => (
                        <div key={time} className="grid grid-cols-8 gap-2">
                          <div className="text-xs text-text-tertiary dark:text-dark-text-tertiary p-2 font-medium">
                            {time}
                          </div>
                          {daysOfWeek.map(day => {
                            const dayEvents = getEventsForDay(day.id);
                            const timeEvent = dayEvents.find(event => event.time === time);
                            
                            return (
                              <div
                                key={`${day.id}-${time}`}
                                className="min-h-[40px] p-1 border border-border/10 dark:border-dark-border/10 rounded-lg hover:bg-surface-secondary dark:hover:bg-dark-surface-secondary transition-colors cursor-pointer"
                                onClick={() => setSelectedTimeSlot({ day: day.id, time })}
                              >
                                {timeEvent && (
                                  <div className={`p-2 rounded text-xs font-medium ${getEventTypeColor(timeEvent.type)}`}>
                                    <div className="truncate">{timeEvent.title}</div>
                                    <div className="text-xs opacity-75">{timeEvent.duration}min</div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              // Day View
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="bg-surface dark:bg-dark-surface rounded-2xl p-4 border border-border/20 dark:border-dark-border/20 md:p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">
                    Heutiger Stundenplan
                  </h3>
                  <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                    {new Date().toLocaleDateString('de-DE', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
                
                <div className="space-y-3">
                  {mockEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-sm active:scale-95 ${getEventTypeColor(event.type)}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold">{event.title}</h4>
                          <p className="text-sm opacity-75 mt-1">{event.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm opacity-75">
                            <span className="flex items-center space-x-1">
                              <Icon name="Clock" size={12} />
                              <span>{event.time}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Icon name="Timer" size={12} />
                              <span>{event.duration} min</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Icon name="BookOpen" size={12} />
                              <span>{event.subject}</span>
                            </span>
                          </div>
                        </div>
                        <button className="p-2 hover:bg-black/5 rounded-lg transition-colors">
                          <Icon name="MoreVertical" size={16} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="grid grid-cols-2 gap-4 md:grid-cols-4"
          >
            <div className="bg-surface dark:bg-dark-surface rounded-2xl p-4 border border-border/20 dark:border-dark-border/20">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Calendar" size={16} className="text-text-tertiary dark:text-dark-text-tertiary" />
                <span className="text-xs text-text-secondary dark:text-dark-text-secondary">Diese Woche</span>
              </div>
              <p className="text-lg font-bold text-text-primary dark:text-dark-text-primary">12</p>
              <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary">Termine</p>
            </div>

            <div className="bg-surface dark:bg-dark-surface rounded-2xl p-4 border border-border/20 dark:border-dark-border/20">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Clock" size={16} className="text-text-tertiary dark:text-dark-text-tertiary" />
                <span className="text-xs text-text-secondary dark:text-dark-text-secondary">Lernzeit</span>
              </div>
              <p className="text-lg font-bold text-text-primary dark:text-dark-text-primary">18.5h</p>
              <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary">Geplant</p>
            </div>

            <div className="bg-surface dark:bg-dark-surface rounded-2xl p-4 border border-border/20 dark:border-dark-border/20">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Target" size={16} className="text-text-tertiary dark:text-dark-text-tertiary" />
                <span className="text-xs text-text-secondary dark:text-dark-text-secondary">Fortschritt</span>
              </div>
              <p className="text-lg font-bold text-text-primary dark:text-dark-text-primary">74%</p>
              <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary">Erfüllt</p>
            </div>

            <div className="bg-surface dark:bg-dark-surface rounded-2xl p-4 border border-border/20 dark:border-dark-border/20">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="TrendingUp" size={16} className="text-text-tertiary dark:text-dark-text-tertiary" />
                <span className="text-xs text-text-secondary dark:text-dark-text-secondary">Streak</span>
              </div>
              <p className="text-lg font-bold text-text-primary dark:text-dark-text-primary">8</p>
              <p className="text-xs text-text-tertiary dark:text-dark-text-tertiary">Tage</p>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Add Event Modal */}
      {showAddEventModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface dark:bg-dark-surface rounded-2xl p-6 w-full max-w-md border border-border/20 dark:border-dark-border/20"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">
                Neuer Termin
              </h3>
              <button
                onClick={() => setShowAddEventModal(false)}
                className="p-2 hover:bg-surface-secondary dark:hover:bg-dark-surface-secondary rounded-lg transition-colors"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <form className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary dark:text-dark-text-primary">
                  Titel
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-surface-secondary dark:bg-dark-surface-secondary border border-border/20 dark:border-dark-border/20 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="z.B. JavaScript Grundlagen"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary dark:text-dark-text-primary">
                    Tag
                  </label>
                  <select className="w-full px-3 py-2 bg-surface-secondary dark:bg-dark-surface-secondary border border-border/20 dark:border-dark-border/20 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent">
                    {daysOfWeek.map(day => (
                      <option key={day.id} value={day.id}>{day.fullName}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary dark:text-dark-text-primary">
                    Zeit
                  </label>
                  <select className="w-full px-3 py-2 bg-surface-secondary dark:bg-dark-surface-secondary border border-border/20 dark:border-dark-border/20 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent">
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary dark:text-dark-text-primary">
                  Beschreibung
                </label>
                <textarea
                  rows="3"
                  className="w-full px-3 py-2 bg-surface-secondary dark:bg-dark-surface-secondary border border-border/20 dark:border-dark-border/20 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="Kurze Beschreibung des Termins..."
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddEventModal(false)}
                  className="flex-1 px-4 py-2 bg-surface-secondary dark:bg-dark-surface-secondary text-text-secondary dark:text-dark-text-secondary rounded-xl hover:bg-surface-tertiary dark:hover:bg-dark-surface-tertiary transition-colors"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
                >
                  Hinzufügen
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <BottomTabNavigation />
      <NavigationBridge />
      <StudySessionOverlay />
    </div>
  );
};

export default StudySchedule; 
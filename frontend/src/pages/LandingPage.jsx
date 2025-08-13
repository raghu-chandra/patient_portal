import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileHeart,
  Shield,
  Upload,
  Users,
  ArrowRight,
  Sparkles,
  Zap,
  Globe,
  Lock,
  Activity,
  Star,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNotifications } from '@/contexts/NotificationContext';

const LandingPage = () => {
  const navigate = useNavigate();
const { notifications, addNotification, removeNotification } = useNotifications();
const handleClick = () => {
    addNotification({
      type: 'success',
      message: 'Our team will contact you regarding the demo within 24 hrs.',
    });
  };
useEffect(() => {
    // Auto-remove notifications after 5 seconds
    notifications.forEach(notif => {
      setTimeout(() => {
        removeNotification(notif.id);
      }, 5000);
    });
  }, [notifications, removeNotification]);
  const features = [
    {
      icon: Upload,
      title: 'Smart Upload',
      description: 'AI-powered document recognition and automatic categorization',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Shield,
      title: 'Bank-Level Security',
      description: 'Enterprise-grade encryption keeps your data completely secure',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Activity,
      title: 'Real-time Analytics',
      description: 'Comprehensive insights into your health document patterns',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Globe,
      title: 'Universal Access',
      description: 'Access your documents anywhere, anytime, on any device',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance for instant file access and management',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Lock,
      title: 'Privacy First',
      description: 'Your data stays private with zero-knowledge architecture',
      color: 'from-indigo-500 to-purple-500',
    },
  ];

  const testimonials = [
    {
      name: 'Dr. MS Dhoni',
      role: 'Cardiologist',
      content: 'This platform has revolutionized how my patients manage their medical records. Exceptional!',
      rating: 5,
    },
    {
      name: 'Suresh Raina',
      role: 'Patient',
      content: 'Finally all my medical documents in one secure place. The interface is incredibly intuitive.',
      rating: 5,
    },
    {
      name: 'Ravindra Jadeja',
      role: 'Healthcare Administrator',
      content: 'The analytics features provide invaluable insights. A game changer for healthcare management.',
      rating: 5,
    },
  ];

  const stats = [
    { number: '100K+', label: 'Active Users' },
    { number: '50M+', label: 'Documents Stored' },
    { number: '99.9%', label: 'Uptime' },
    { number: '256-bit', label: 'Encryption' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-6xl mx-auto text-center space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
                  HealthVault Pro
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                The future of medical document management. Secure, intelligent, and beautifully designed 
                for the modern healthcare experience.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => navigate('/app')}
                size="lg"
                className="btn-hero text-lg px-8 py-4 h-14 hover-scale shadow-xl"
              >
                <Users className="h-5 w-5 mr-2" />
                Launch Portal
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to manage your medical documents with confidence and ease
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="group p-6 border-primary/20 hover:border-primary/40 transition-all duration-300 hover-scale hover:shadow-xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">What Users Say</h2>
              <p className="text-xl text-muted-foreground">
                Trusted by healthcare professionals and patients worldwide
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6 border-primary/20 hover:border-primary/40 transition-all duration-300 hover-scale">
                  <div className="flex items-center mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-12 text-center border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
            <div className="space-y-8">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-primary flex items-center justify-center">
                <FileHeart className="h-10 w-10 text-primary-foreground" />
              </div>
              
              <div className="space-y-4">
                <h2 className="text-4xl font-bold">Ready to Transform Your Health Management?</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Join thousands of users who have already revolutionized how they manage their medical documents
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate('/app')}
                  size="lg"
                  className="btn-hero text-lg px-8 py-4 h-14 hover-scale shadow-xl"
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Get Started Free
                  <ChevronRight className="h-5 w-5 ml-2" />
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4 h-14 border-primary/30 hover:bg-primary/10 hover:border-primary hover-scale"
                  onClick={handleClick}
                >
                  Schedule Demo
                </Button>
                <div className="fixed top-5 right-5 space-y-2 z-50">
        {notifications.map(({ id, message, type }) => (
          <div
            key={id}
            className={`p-4 rounded shadow text-white ${
              type === 'success' ? 'bg-green-600' : 'bg-blue-600'
            }`}
          >
            {message}
          </div>
        ))}
      </div>
              </div>

              <p className="text-sm text-muted-foreground">
                No credit card required • 30 day free trial • Cancel anytime
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <FileHeart className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">HealthVault Pro</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Secure, intelligent medical document management for the modern world
            </p>
            <p className="text-sm text-muted-foreground">
              © 2025 HealthVault Pro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

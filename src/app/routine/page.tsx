"use client";

import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Dog, Cat, Home, Download, Loader2, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";

interface Routine {
  id: number;
  petType: string;
  apartmentSize: string;
  morningRoutine: string;
  afternoonRoutine: string;
  eveningRoutine: string;
  exerciseTips: string;
  feedingSchedule: string;
}

export default function RoutinePage() {
  // Basic fields
  const [petType, setPetType] = useState<string>("");
  const [apartmentSize, setApartmentSize] = useState<string>("");
  
  // New pet information fields
  const [breed, setBreed] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [activityLevel, setActivityLevel] = useState<string>("");
  const [healthConditions, setHealthConditions] = useState<string>("");
  
  // Home & Lifestyle fields
  const [balconyAccess, setBalconyAccess] = useState<string>("");
  const [familyMembers, setFamilyMembers] = useState<string>("");
  const [workSchedule, setWorkSchedule] = useState<string>("");
  
  // Food & Routine preferences
  const [dietType, setDietType] = useState<string>("");
  const [mealsPerDay, setMealsPerDay] = useState<string>("");
  const [routineStyle, setRoutineStyle] = useState<string>("detailed");
  const [budgetTips, setBudgetTips] = useState<boolean>(false);
  const [productRecommendations, setProductRecommendations] = useState<boolean>(false);
  
  // UI state
  const [routine, setRoutine] = useState<Routine | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [jokeMessage, setJokeMessage] = useState("");

  // Humor filter - forbidden pet types
  const forbiddenPetTypes = [
    "human", "husband", "wife", "boyfriend", "girlfriend", 
    "alien", "dinosaur", "robot", "person", "man", "woman",
    "child", "baby", "kid", "teenager", "adult"
  ];

  const checkForJokes = (input: string): boolean => {
    const lowerInput = input.toLowerCase().trim();
    return forbiddenPetTypes.some(forbidden => lowerInput.includes(forbidden));
  };

  const handleGenerate = async () => {
    // Check for joke inputs
    if (checkForJokes(petType)) {
      setJokeMessage(`😂 Nice try! I can't create a care routine for a ${petType}. Please choose an actual pet.`);
      setError("");
      setRoutine(null);
      return;
    }
    
    setJokeMessage("");

    if (!petType || !apartmentSize || !age || !size || !activityLevel || !balconyAccess || !familyMembers || !workSchedule || !dietType || !mealsPerDay) {
      setError("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Construct detailed prompt for Gemini
      const detailedPrompt = `Generate a personalized daily and weekly pet care routine with the following details:

Pet Type: ${petType}
Breed: ${breed || "Not specified"}
Age: ${age}
Size/Weight: ${size}
Activity Level: ${activityLevel}
Health Conditions: ${healthConditions || "None specified"}
Apartment Size: ${apartmentSize}
Balcony Access: ${balconyAccess}
Family Members: ${familyMembers}
Owner Work Schedule: ${workSchedule}
Diet Type: ${dietType}
Meals Per Day: ${mealsPerDay}

User Preferences:
- Routine Style: ${routineStyle}
- Add Budget Tips: ${budgetTips ? "Yes" : "No"}
- Add Product Recommendations: ${productRecommendations ? "Yes" : "No"}

Your output must include:
1. Morning, afternoon, evening, and night schedule.
2. Feeding & hydration timings.
3. Exercise and play recommendations.
4. Mental stimulation activities.
5. Grooming notes & vet reminders.
6. Home environment improvements.
7. Apartment-size-specific tips.
8. Weekly checklist.
${budgetTips ? "9. Budget tips for affordable pet care." : ""}
${productRecommendations ? "10. Product suggestions suitable for Indian apartment owners." : ""}

Format the output in a friendly, readable manner with clear sections and emojis where appropriate.`;

      const response = await fetch(`/api/routines-test`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: detailedPrompt }),
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.routine) {
          // Parse the Gemini response into structured format
          setRoutine({
            id: Date.now(),
            petType,
            apartmentSize,
            morningRoutine: data.routine,
            afternoonRoutine: "",
            eveningRoutine: "",
            exerciseTips: "",
            feedingSchedule: "",
          });
        } else {
          setError("Failed to generate routine. Please try again.");
        }
      } else {
        setError("Failed to fetch routine. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!routine) return;

    const content = `
PawSpace - Apartment Pet Care Routine
=====================================

Pet Type: ${petType.toUpperCase()}
Breed: ${breed || "Not specified"}
Age: ${age}
Size: ${size}
Activity Level: ${activityLevel}
Apartment Size: ${apartmentSize.toUpperCase()}
Balcony Access: ${balconyAccess}
Family Members: ${familyMembers}
Work Schedule: ${workSchedule}
Diet Type: ${dietType}
Meals Per Day: ${mealsPerDay}

PERSONALIZED ROUTINE
--------------------
${routine.morningRoutine}

---
Generated by PawSpace - Your Guide to Happy Pets in Small Spaces
Visit: https://pawspace.in
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pawspace-routine-${petType}-${apartmentSize}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const isFormValid = petType && apartmentSize && age && size && activityLevel && balconyAccess && familyMembers && workSchedule && dietType && mealsPerDay;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#fef9f3] via-[#fef3e2] to-[#d4f4dd] py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                Personalized Pet Routine Generator
              </h1>
              <p className="text-lg text-muted-foreground">
                Get a comprehensive, AI-powered daily routine tailored to your pet's unique needs
              </p>
            </div>
          </div>
        </section>

        {/* Selection Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
                {/* Pet Type Selection */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Select Your Pet Type *</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={() => setPetType("dog")}
                      className={`flex items-center gap-4 p-6 border-2 rounded-xl transition-all ${
                        petType === "dog"
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border hover:border-primary/50 hover:bg-secondary"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        petType === "dog" ? "bg-primary/10" : "bg-secondary"
                      }`}>
                        <Dog className={`w-6 h-6 ${petType === "dog" ? "text-primary" : "text-muted-foreground"}`} />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-foreground">Dog</div>
                        <div className="text-sm text-muted-foreground">Active companion</div>
                      </div>
                      {petType === "dog" && (
                        <CheckCircle className="w-5 h-5 text-primary ml-auto" />
                      )}
                    </button>

                    <button
                      onClick={() => setPetType("cat")}
                      className={`flex items-center gap-4 p-6 border-2 rounded-xl transition-all ${
                        petType === "cat"
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border hover:border-primary/50 hover:bg-secondary"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        petType === "cat" ? "bg-primary/10" : "bg-secondary"
                      }`}>
                        <Cat className={`w-6 h-6 ${petType === "cat" ? "text-primary" : "text-muted-foreground"}`} />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-foreground">Cat</div>
                        <div className="text-sm text-muted-foreground">Independent friend</div>
                      </div>
                      {petType === "cat" && (
                        <CheckCircle className="w-5 h-5 text-primary ml-auto" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Apartment Size Selection */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Select Your Apartment Size *</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { value: "studio", label: "Studio", subtitle: "250-350 sq ft" },
                      { value: "1bhk", label: "1 BHK", subtitle: "400-600 sq ft" },
                      { value: "2bhk", label: "2 BHK", subtitle: "700-1000 sq ft" },
                      { value: "3bhk", label: "3 BHK", subtitle: "1000+ sq ft" },
                    ].map((aptSize) => (
                      <button
                        key={aptSize.value}
                        onClick={() => setApartmentSize(aptSize.value)}
                        className={`flex flex-col items-center gap-3 p-6 border-2 rounded-xl transition-all ${
                          apartmentSize === aptSize.value
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-border hover:border-primary/50 hover:bg-secondary"
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          apartmentSize === aptSize.value ? "bg-primary/10" : "bg-secondary"
                        }`}>
                          <Home className={`w-6 h-6 ${apartmentSize === aptSize.value ? "text-primary" : "text-muted-foreground"}`} />
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-foreground">{aptSize.label}</div>
                          <div className="text-xs text-muted-foreground">{aptSize.subtitle}</div>
                        </div>
                        {apartmentSize === aptSize.value && (
                          <CheckCircle className="w-5 h-5 text-primary" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pet Information */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Pet Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Breed */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Breed (Optional)
                      </label>
                      <input
                        type="text"
                        value={breed}
                        onChange={(e) => setBreed(e.target.value)}
                        placeholder="e.g., Labrador, Persian"
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      />
                    </div>

                    {/* Age */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Age *
                      </label>
                      <select
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      >
                        <option value="">Select age</option>
                        <option value="Puppy/Kitten">Puppy/Kitten</option>
                        <option value="Adult">Adult</option>
                        <option value="Senior">Senior</option>
                      </select>
                    </div>

                    {/* Size/Weight */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Size/Weight *
                      </label>
                      <select
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      >
                        <option value="">Select size</option>
                        <option value="Small">Small (0-10 kg)</option>
                        <option value="Medium">Medium (10-25 kg)</option>
                        <option value="Large">Large (25+ kg)</option>
                      </select>
                    </div>

                    {/* Activity Level */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Activity Level *
                      </label>
                      <select
                        value={activityLevel}
                        onChange={(e) => setActivityLevel(e.target.value)}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      >
                        <option value="">Select activity level</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Home & Lifestyle */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Home & Lifestyle</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Balcony Access */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Balcony/Outdoor Access *
                      </label>
                      <select
                        value={balconyAccess}
                        onChange={(e) => setBalconyAccess(e.target.value)}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      >
                        <option value="">Select option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>

                    {/* Family Members */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Number of Family Members *
                      </label>
                      <select
                        value={familyMembers}
                        onChange={(e) => setFamilyMembers(e.target.value)}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      >
                        <option value="">Select number</option>
                        <option value="1">1 (Living alone)</option>
                        <option value="2">2</option>
                        <option value="3-4">3-4</option>
                        <option value="5+">5+</option>
                      </select>
                    </div>

                    {/* Work Schedule */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Owner Work Schedule *
                      </label>
                      <select
                        value={workSchedule}
                        onChange={(e) => setWorkSchedule(e.target.value)}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      >
                        <option value="">Select schedule</option>
                        <option value="Work From Home">Work From Home</option>
                        <option value="Office 9-5">Office 9-5</option>
                        <option value="Shift Work">Shift Work</option>
                        <option value="Student">Student</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Food & Routine Preferences */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Food & Routine Preferences</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Diet Type */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Diet Type *
                      </label>
                      <select
                        value={dietType}
                        onChange={(e) => setDietType(e.target.value)}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      >
                        <option value="">Select diet type</option>
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Non-vegetarian">Non-vegetarian</option>
                        <option value="Mixed">Mixed</option>
                      </select>
                    </div>

                    {/* Meals Per Day */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Meals Per Day *
                      </label>
                      <select
                        value={mealsPerDay}
                        onChange={(e) => setMealsPerDay(e.target.value)}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      >
                        <option value="">Select meals</option>
                        <option value="1">1 meal</option>
                        <option value="2">2 meals</option>
                        <option value="3">3 meals</option>
                        <option value="4">4 meals</option>
                      </select>
                    </div>

                    {/* Routine Style */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Preferred Routine Style
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { value: "compact", label: "Compact" },
                          { value: "detailed", label: "Detailed" },
                          { value: "weekly", label: "Weekly Overview" },
                        ].map((style) => (
                          <button
                            key={style.value}
                            type="button"
                            onClick={() => setRoutineStyle(style.value)}
                            className={`px-4 py-3 border-2 rounded-lg transition-all font-medium ${
                              routineStyle === style.value
                                ? "border-primary bg-primary/5 text-primary"
                                : "border-border hover:border-primary/50 hover:bg-secondary text-foreground"
                            }`}
                          >
                            {style.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Advanced Options - Collapsible */}
                <div className="mb-8">
                  <button
                    onClick={() => setAdvancedOpen(!advancedOpen)}
                    className="w-full flex items-center justify-between p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-foreground">Advanced Options</h3>
                    {advancedOpen ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                  
                  {advancedOpen && (
                    <div className="mt-4 p-4 border border-border rounded-lg space-y-4">
                      {/* Health Conditions */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Health Conditions (Optional)
                        </label>
                        <textarea
                          value={healthConditions}
                          onChange={(e) => setHealthConditions(e.target.value)}
                          placeholder="e.g., Arthritis, allergies, sensitive stomach..."
                          rows={3}
                          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                        />
                      </div>

                      {/* Toggles */}
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={budgetTips}
                            onChange={(e) => setBudgetTips(e.target.checked)}
                            className="w-5 h-5 rounded border-border text-primary focus:ring-2 focus:ring-primary/20"
                          />
                          <span className="text-sm font-medium text-foreground">
                            Add Budget Tips (affordable care options)
                          </span>
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={productRecommendations}
                            onChange={(e) => setProductRecommendations(e.target.checked)}
                            className="w-5 h-5 rounded border-border text-primary focus:ring-2 focus:ring-primary/20"
                          />
                          <span className="text-sm font-medium text-foreground">
                            Add Product Recommendations (India-specific)
                          </span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                {/* Joke Message */}
                {jokeMessage && (
                  <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg text-primary text-sm font-medium">
                    {jokeMessage}
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                    {error}
                  </div>
                )}

                {/* Generate Button */}
                <button
                  onClick={handleGenerate}
                  disabled={isLoading || !isFormValid}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating Your Personalized Routine...
                    </>
                  ) : (
                    "Generate Personalized Routine"
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Routine Display Section */}
        {routine && (
          <section className="py-12 bg-secondary">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-foreground">
                    Your Personalized Routine
                  </h2>
                  <button
                    onClick={handleDownloadPDF}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                  >
                    <Download className="w-5 h-5" />
                    Download
                  </button>
                </div>

                {/* Routine Card */}
                <div className="bg-white rounded-xl p-8 shadow-md">
                  <div className="prose prose-lg max-w-none">
                    <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                      {routine.morningRoutine}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-xl text-center">
                  <p className="text-foreground mb-4">
                    Want more personalized advice and premium guides?
                  </p>
                  <a
                    href="/membership"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                  >
                    Explore Membership Benefits
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
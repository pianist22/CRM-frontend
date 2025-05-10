"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  Plus,
  Trash2,
  Filter,
  AlertCircle
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import MessageGenerator from "@/components/MessageGenerator";
import { campaignService } from "@/services/api";

export default function CreateCampaignPage({ userId }) {
  const [rules, setRules] = useState([
    { id: '1', field: 'spend', operator: '>', value: '', connector: 'AND' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [audienceSize, setAudienceSize] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      message: '',
      personalizedField: ''
    },
    mode: 'onChange'
  });

  const watchedValues = watch();

  const addRule = () => {
    const id = (rules.length + 1).toString();
    setRules([...rules, { id, field: 'spend', operator: '>', value: '', connector: 'AND' }]);
  };

  const removeRule = (id) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  const updateRule = (id, field, value) => {
    setRules(rules.map(rule => rule.id === id ? { ...rule, [field]: value } : rule));
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const personalizedMessage = data.message.replace(/{{(.*?)}}/g, (_, key) => `{{${key}}}`);

      const payload = {
        name: data.name,
        description: data.description,
        message: personalizedMessage,
        rules: rules,
        userId: userId
      };

      await campaignService.createCampaign(payload);
      router.push("/campaigns");
    } catch (error) {
      console.error("Error creating campaign:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedMessageSelect = (suggestedText) => {
    setValue("message", suggestedText);
  };

  const handlePreviewAudience = async () => {
    setPreviewLoading(true);
    setPreviewError(null);
    try {
      const response = await campaignService.getAudienceSize(rules);
      setAudienceSize(response.audienceSize);
    } catch (error) {
      setPreviewError("Failed to fetch audience size");
    } finally {
      setPreviewLoading(false);
    }
  };

  const isRuleValid = () => rules.every(rule => rule.value !== '');

  return (
    <motion.div initial="hidden" animate="visible" className="max-w-6xl mx-auto">
      <Card className="shadow-lg border-none">
        <CardHeader className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white rounded-t-lg py-8">
          <CardTitle className="text-3xl font-extrabold flex items-center mb-3">
            <div className="bg-white/20 p-2 rounded-lg mr-3">
              <Filter className="h-7 w-7" />
            </div>
            <span className="tracking-tight">Create Campaign Segment</span>
          </CardTitle>
          <CardDescription className="text-blue-50 text-lg max-w-2xl">
            Target specific customers with powerful segmentation rules and deliver personalized messages
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="name">Campaign Name</Label>
              <Input id="name" {...register("name", { required: "Campaign name is required" })} />
              {errors.name && <p className="text-red-600 text-sm"><AlertCircle className="inline h-4 w-4" /> {errors.name.message}</p>}
            </div>

            <div>
              <Label htmlFor="description">Campaign Description</Label>
              <Textarea id="description" {...register("description")} rows={2} />
            </div>

            {/* Message Generator Component */}
            <MessageGenerator onSelect={handleSuggestedMessageSelect}/>

            <div>
              <Label htmlFor="message">
                Message Content <span className="text-sm text-gray-500">(use {'{{firstName}}'}, {'{{lastName}}'} for personalization)</span>
              </Label>
              <Textarea id="message" {...register("message", { required: "Message content is required" })} rows={4} />
              {errors.message && <p className="text-red-600 text-sm"><AlertCircle className="inline h-4 w-4" /> {errors.message.message}</p>}
            </div>

            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Target Audience Rules</h3>
              <Button type="button" onClick={addRule} variant="outline"><Plus className="h-4 w-4 mr-1" /> Add Rule</Button>
            </div>

            {rules.map((rule, index) => (
              <div key={rule.id} className="flex gap-2 items-center mb-2">
                {index > 0 && (
                  <Select value={rule.connector} onValueChange={(val) => updateRule(rule.id, 'connector', val)}>
                    <SelectTrigger className="w-20"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AND">AND</SelectItem>
                      <SelectItem value="OR">OR</SelectItem>
                    </SelectContent>
                  </Select>
                )}
                <Select value={rule.field} onValueChange={(val) => updateRule(rule.id, 'field', val)}>
                  <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spend">Spend</SelectItem>
                    <SelectItem value="visits">Visits</SelectItem>
                    <SelectItem value="last_active">Last Active (Days)</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={rule.operator} onValueChange={(val) => updateRule(rule.id, 'operator', val)}>
                  <SelectTrigger className="w-16"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value=">">&gt;</SelectItem>
                    <SelectItem value="<">&lt;</SelectItem>
                    <SelectItem value="=">=</SelectItem>
                  </SelectContent>
                </Select>
                <Input value={rule.value} onChange={(e) => updateRule(rule.id, 'value', e.target.value)} placeholder="Value" className="w-28" />
                {index > 0 && (
                  <Button variant="ghost" size="icon" onClick={() => removeRule(rule.id)}><Trash2 className="text-red-500" /></Button>
                )}
              </div>
            ))}

            <div className="flex justify-between items-center">
              <Button type="button" onClick={handlePreviewAudience} disabled={!isRuleValid()} variant="secondary">
                Preview Audience
              </Button>
              {previewLoading && <p>Loading...</p>}
              {audienceSize && <p className="text-green-700">Estimated Audience: {audienceSize}</p>}
              {previewError && <p className="text-red-500">{previewError}</p>}
            </div>

            <Button type="submit" disabled={!isValid || !isRuleValid()}>
              {isLoading ? 'Creating...' : 'Create Campaign'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}


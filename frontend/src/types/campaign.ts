import type { IDateValue, IDatePickerControl } from './common';

// ----------------------------------------------------------------------

export type IAdSetTableFilters = {
  name: string;
  status: string;
  endDate: IDatePickerControl;
  startDate: IDatePickerControl;
};

export type IAd = {
  id: string;
  channel: string;
  adType: string;
  budget: number;
  estimatedImpressions: number;
  estimatedClicks: number;
  kv: string;
  kvUrl: string;
  primaryText: string;
  headline: string;
  cta: string;
};

export type IAdSet = {
  id: string;
  name: string;
  targetSegment: string;
  startDate: IDateValue;
  endDate: IDateValue;
  totalBudget: number;
  totalEstimatedImpressions: number;
  totalEstimatedClicks: number;
  status: string;
  ads: IAd[];
};

export type ICampaign = {
  name: string;
  purpose: string;
  startDate: IDateValue;
  endDate: IDateValue;
  totalBudget: number;
  totalEstimatedImpressions: number;
  totalEstimatedClicks: number;
  adSets: IAdSet[];
};

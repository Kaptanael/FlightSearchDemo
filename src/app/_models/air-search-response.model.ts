  export interface FareBreakdown {
    TaxesBreakdown: any[];
    Discount: number;
    MarkupAmount: number;
    ServiceCharge: number;
    PassengerType: string;
    TotalFare: number;
    NoOfPassenger: number;
    BaseFare: number;
    TotalTax: number;
    Surcharges: number;
    Fees: number;
    AIT: number;
  }

  export interface Onward {
    OriginAirPortName: string;
    DestinationAirPortName: string;
    GridRatio: string;
    LayoverGridRatio: string;
    LayoverTime: string;
    AirSegment_Key?: any;
    Group: number;
    Carrier: string;
    CarrierName: string;
    FlightNumber: string;
    Origin: string;
    Destination: string;
    DepartureTime: Date;
    ArrivalTime: Date;
    TravelDuration: string;
    Distance?: any;
    AvailabilitySource?: any;
    OperatingCarrier: string;
    OperatingCarrierName: string;
    OperatingFlightNumber: string;
    OriginTerminal: string;
    DestinationTerminal: string;
    BookingCode: string;
    BookingCount: string;
    CabinClass: string;
    FareBasis?: any;
    Currency: string;
    AirBaggageAllowance: string;
    Equipment: string;
    HiddenSegment?: any;
  }

  export interface TotalTravelTime {
    TravelType: string;
    TotalTravelDuration: string;
    NoOfStop: number;
    SegmentCount: number;
  }

  export interface Payload {
    FareBreakdown: FareBreakdown[];
    Onwards: Onward[];
    Returns: any[];
    TotalTravelTimes: TotalTravelTime[];
    TotalDiscount: number;
    TotalServiceCharge: number;
    TotalAIT: number;
    AgentExtraFair: number;
    SubAgentExtraFair: number;
    TotalMarkup: number;
    CampaignDiscount: string;
    CampaignBank: string;
    CampaignMaxDiscount: string;
    DepositTotalPrice: number;
    OnlineTotalPrice: number;
    MatchingData?: any;
    MetaKey?: any;
    ApiName?: any;
    MatchingResults?: any;
    AirPricingSolution_Key: string;
    TotalPrice: number;
    BasePrice: number;
    AIT: number;
    APICurrencyType: string;
    PassengerType: string;
    Adults: number;
    Childs: number;
    Infants: number;
    PlatingCarrier: string;
    PlatingCarrierName: string;
    IsRefundable: boolean;
    IsBookable: boolean;
    IsTaxBreakdownAvailable: boolean;
    TotalTax: number;
    LatestTicketingTime: string;
    ChangePenalties?: any;
    CancelPenalties?: any;
    FareType: string;
    TripType: string;
    SegmentCode: string;
    HasOwnID: boolean;
    OwnIDRef: string;
    IGXKey: string;
    AdditionalText: string;
    GDSCode?: any;
  }

  export interface AirSearchResponse {
    RequestTime: string;
    ResponseTime: string;
    RequestURL: string;
    Success: boolean;
    Message?: any;
    Payload: Payload[];
    PayloadType: string;
    ApiRequestTime: string;
    ApiResponseTime?: any;
    MainApiRequestTime?: any;
    MainApiResponseTime?: any;
    Time1?: any;
    Time2?: any;
    Time3?: any;
    Time4?: any;
    Time5?: any;
  }


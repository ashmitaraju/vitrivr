import {Skeleton} from '../pose-query.interface';
import Two from 'two.js';
import {DrawableJoint} from './drawableJoint';

export class DrawableSkeleton extends Two.Group implements Skeleton {

  /** Connections within a {@link DrawableSkeleton}. */
  public static CONNECTIONS = [
    [15, 13], [13, 11], [16, 14], [14, 12], [11, 12], [5, 11], [6, 12], [5, 6], [5, 7],
    [6, 8], [7, 9], [8, 10], [1, 2], [0, 1], [0, 2], [1, 3], [2, 4], [0, 5], [0, 6]
  ]

  /** The default {@link Skeleton}. */
  public static DEFAULT = <Skeleton>{
    nose: {x: 0.15, y: 0.020 , disable: false},
    left_eye: {x: 0.125 , y: 0.00, disable: false},
    right_eye: {x: 0.175 , y: 0.00 , disable: false},
    left_ear: {x: 0.100 , y: 0.01 , disable: false},
    right_ear: {x: 0.200, y: 0.01, disable: false},
    left_shoulder: {x: 0.05, y: 0.075, disable: false},
    right_shoulder: {x: 0.25, y: 0.075, disable: false},
    left_elbow: {x: 0.00, y: 0.15, disable: false},
    right_elbow: {x: 0.30, y: 0.15, disable: false},
    left_wrist: {x: 0.00, y: 0.25, disable: false},
    right_wrist: {x: 0.30, y: 0.25, disable: false},
    left_hip: {x: 0.075, y: 0.35, disable: false},
    right_hip: {x: 0.225, y: 0.35, disable: false},
    left_knee: {x: 0.05, y: 0.50, disable: false},
    right_knee: {x: 0.25, y: 0.50, disable: false},
    left_ankle: {x: 0.075, y: 0.65, disable: false},
    right_ankle: {x: 0.225, y: 0.65, disable: false}
  }

  /** Raw, normalised coordinates of preset value. */
  private static PRESETS_RAW = [
    [0.14786067473578227,0.027725922797031552,0.16690833079236223,0.004595860913616994,0.12813142463937924,0.004998386595458036,0.19846337429218208,0.013536842778684626,0.09530139401282084,0.014769689848586984,0.24295941869330231,0.13864771714913168,0.05245594884344723,0.14004215444598436,0.28307719090994365,0.2918733096731531,0.01671892793090125,0.2965361997921151,0.2140336349998271,0.2878901521438324,0.09501507860322922,0.2871112376096802,0.21086897737504487,0.4772577808650923,0.08273194070569824,0.47733830517027104,0.21133751396755993,0.7418788543691817,0.08202245897562371,0.7418986886243101,0.209322706855775,0.9880255222365016,0.08205575029098638,0.9886087402602408],
    [0.7213538193000133,0.10489923404582464,0.7499239456821119,0.0862144854537864,0.7183635429402153,0.07364320264465157,0.7695176991348829,0.084977065091573,0.7051536405641034,0.060781363290529904,0.7401628479740729,0.20347430780453243,0.6234211294178052,0.14212588541486584,0.7027353450432424,0.3724411039140399,0.513828462919117,0.25303355520098103,0.6564550816226506,0.4207381294386795,0.4928253898159626,0.306962467476444,0.4680617608785612,0.44847512140294654,0.3916056804747765,0.3944736689763453,0.29745958892936994,0.529450591974763,0.1951017029727768,0.4803908287135377,0.06422130930846882,0.7071823626748978,0.0,0.6649892244609281],
    [0.34647063578407183,0.04402653164155983,0.36790758874062335,0.01980175062218513,0.32994552277887795,0.015085660808966013,0.38736007944982037,0.02438399480806348,0.292729848361791,0.012633292413831035,0.4004927048580237,0.15895959500358495,0.21907433424934428,0.13258183437389534,0.40662684279192385,0.350007989263702,0.13883189739956284,0.30124563957636025,0.365778601454939,0.4307903593607051,0.1671166554247022,0.3934726027908739,0.295449111507498,0.49419840901808415,0.16973957917259155,0.475950529048519,0.23631964487843113,0.7041273994597045,0.1097739857765313,0.685714534625916,0.18102387260799946,0.9739716095205662,0.06828135206225336,0.9607080642532666],
    [0.3187956812202486,0.04834529767141674,0.3417736970937995,0.022581142646444723,0.29656248447420336,0.022771517741630574,0.3823752722764503,0.024066982980132736,0.25968917171851436,0.024427688338910927,0.43938526032325265,0.1414973598041731,0.20628954177211978,0.13999848810082333,0.5349356119065684,0.26484395683236533,0.08250820530693598,0.24007011661333716,0.5461739375804637,0.31673208318139706,0.03585897591017134,0.27646704097588204,0.4027723410969954,0.4840825844659735,0.25036680176876847,0.4840016704409523,0.42790075628862834,0.7166147909697406,0.22611502992786156,0.7179230077091516,0.43649610269328293,0.9743049721607032,0.2282998627387093,0.9719007646139638],
    [0.2399686708885373,0.031366357016517715,0.23474780233461792,0.008132360385484174,0.2382576827103055,0.008593978890798682,0.15005428537648782,0.008706576073356502,0.2430454415505657,0.01528731809911607,0.07827764957270145,0.13555725667910168,0.26675619494869135,0.14372989267587502,0.02377247958388249,0.3041802271792478,0.3128079493797811,0.3172522865896448,0.05169821954375805,0.41523349752558214,0.3339424965143624,0.4237324947174246,0.09526451109656155,0.47463611951531814,0.222918537537704,0.4790019740166299,0.11024259019914448,0.7351048493761185,0.23413073834066173,0.7398597746912663,0.09671292215892562,0.9765975914458251,0.21215157356446862,0.9867140666257113],
    [0.4722586330777761,0.06245592379145936,0.47475656179025416,0.03863467202913199,0.4715430410241313,0.0378547590847102,0.3987972476624,0.023026216975389067,0.4902772609724586,0.03687385201601231,0.3127200816968642,0.1217042505174494,0.5045059563436225,0.1486957225349142,0.18610303131990297,0.23041443186178573,0.5887418714699776,0.2881836692183734,0.13440913379624567,0.29265425693962627,0.6558541532672532,0.3585136011392305,0.2627118861392539,0.4718480329234168,0.392095565545385,0.48621159996779256,0.24960725436414338,0.6964346471883983,0.44046214936270706,0.7122215290669175,0.18321386552585345,0.9383588402308314,0.41172873022583956,0.9654252233077812],
    [0.23088448716767412,0.032759566410586215,0.25146982764301623,0.008249396954759966,0.20919059565560041,0.008226896721882747,0.28451592861949,0.01363460924442895,0.17013264901833347,0.013189054774432,0.3325281668438561,0.1384565409313353,0.11157304376951052,0.1370228346517876,0.3998378059507644,0.288298596835594,0.02718321274630374,0.28203737271904133,0.38570611559282625,0.3553635470518351,0.05639421316216023,0.3470050931928736,0.2927817732601004,0.4806818040266989,0.1487100571908551,0.4808414814118183,0.3017698963595466,0.7358939157104383,0.14666471973444134,0.7365555793531067,0.2990467003906516,0.9806701636944384,0.1469308583145921,0.9807484473579576],
    [0.16452148040696005,0.06431386764223337,0.18161682667110002,0.04330796171052555,0.14848173905379855,0.04353057985172961,0.20817043174507174,0.053790776532373734,0.1287204827400301,0.054008609766258105,0.24111395624536097,0.16248553807352786,0.10225240070426042,0.1602527699647094,0.27563543207591706,0.21704937710574768,0.05028986538820838,0.1941354725343216,0.2307125428887661,0.1309214176945636,0.08531180928142099,0.09020429933368815,0.22017554976790898,0.49681892138869554,0.12022449090555297,0.49609752329185136,0.22433755302122801,0.7494096529647717,0.1177378312887096,0.749509069656235,0.23150605908831978,0.9857252367094845,0.12234707809271306,0.9839915293025217],
    [0.11606053243874027,0.0270437022576296,0.13616465440181702,0.0028023321750370593,0.09747589964739004,0.0038782405601956306,0.17426433565718014,0.012930851893831122,0.07210413759440297,0.015902492556410495,0.22896384138230363,0.1485191413282448,0.04053162304601461,0.15311839064678132,0.27026587712773764,0.3231407563404719,0.013451708384539912,0.3269765094835341,0.23653231665359598,0.45291143205325596,0.03367405192029359,0.4570689768669852,0.1991580979155506,0.4907373016433993,0.07450152001575303,0.49142585516091714,0.19743018496962986,0.7493930511563287,0.07692116649869529,0.7494809013062368,0.20187063553701953,0.9886643142012324,0.08697484718723024,0.9882643079859232],
    [0.2578750971194341,0.042338902016865694,0.28573586290059105,0.010415898157057363,0.22823216598116372,0.011270707473312417,0.33325784043335377,0.016664482178861198,0.17717868900578815,0.018890007639890603,0.4032274025380098,0.16775720222168652,0.10665618165026788,0.17219568226712859,0.46763052811312733,0.38740177572094125,0.04896426877581768,0.39710008113074774,0.400868830625481,0.48804980246619106,0.13275920652210593,0.4918362767601879,0.35475185346935995,0.5347165248006728,0.161175031404476,0.5374322707786174,0.4487952313883948,0.6447514223523239,0.09605790104553598,0.6504330559427914,0.43305887714886976,0.976483257500143,0.12012831377021528,0.9796812290174097],
    [0.19183184498988115,0.028796478624020308,0.2123992304912999,0.0041782844122647935,0.170051883450276,0.0037658706182535444,0.24383009934622837,0.01450177124450753,0.1308348047612105,0.013340754379977381,0.2893731731204516,0.1529753483250224,0.07172729372375874,0.15093279130045906,0.3338028341672165,0.32708707221267436,0.016971408055286952,0.32619990008372296,0.32059886654947506,0.45603778178222826,0.037286536519592385,0.4588454561494976,0.24511069500428714,0.49728249895953847,0.10467341503296075,0.49603115750218796,0.24048510745778406,0.7498397624809046,0.10117939822380141,0.7480323904839153,0.2282715214624941,0.9863556270531314,0.09915828597683654,0.9854269784748948],
    [0.08226445116034334,0.03204743136367326,0.0848317332116755,0.009340588451672419,0.08727337659366007,0.008761185350988444,0.08532342172537727,0.016562127716966586,0.17407814140291455,0.00915123912344954,0.07033089584529298,0.14338081388945043,0.24452318087475916,0.13447611670692078,0.04112362648607347,0.3210815754774492,0.2964935113068324,0.3003495825081344,0.028135962501173697,0.42935873819865494,0.26665733921508433,0.4054671604274717,0.1159352265237858,0.4769528585865219,0.23622540231007644,0.4714263083578554,0.10161433333941987,0.7392284206818608,0.22044113527756246,0.7341525090877377,0.12479187013565574,0.9884480448121034,0.23894771159028128,0.9764128131921074],
    [0.12734029563359342,0.15133950896619194,0.12298238868799465,0.12656438975095805,0.10447817545332672,0.14066633557170807,0.13433288324003106,0.11483870308163883,0.10933161977344577,0.13316864086569533,0.22284232378137966,0.1577496208273045,0.17681142796072485,0.20386976034462864,0.30627283633339447,0.22933821252671666,0.21551951279330592,0.31124792148535374,0.30478597772161964,0.274265869704609,0.21955966604011706,0.338896950901756,0.5196355857073021,0.27755918411974106,0.49529939575392046,0.31655276084673234,0.6835140205202531,0.3347282185012585,0.6602594953135145,0.3744873667429691,0.915560142236427,0.42426099206852425,0.8980173378449324,0.4557398023243274],
    [0.21302123341881887,0.04363235302433048,0.21322964055759056,0.02050518096878752,0.2143883392666789,0.0206078075501095,0.18883533158838853,0.024127377002962223,0.28477566639466184,0.016756066977891348,0.15851813748628082,0.14450711495740384,0.35537952196897243,0.132016467180799,0.0699662377312127,0.29235936666574575,0.43613052187658,0.2694748100574851,0.0335591809755858,0.3667221020375115,0.43813408355332845,0.3490541987628603,0.23237631030890046,0.48019400191328926,0.364448608219399,0.4724704024274065,0.20762553260496827,0.7263204330607121,0.36240295751707613,0.7182499381809815,0.23288724292025487,0.9774128632023387,0.3943418587077674,0.9614132273752769],
    [0.4007029297206234,0.059846459778706985,0.4410321932710007,0.01779891085672016,0.35999258124783323,0.0182172139836721,0.5081034271685229,0.02639114670564744,0.29479127722917636,0.027051504005909083,0.5974320694241122,0.21479448459013914,0.20773895031239456,0.21711731667154938,0.6967902001758205,0.4885193518111789,0.09284901073961242,0.49085845193725697,0.5858214631701515,0.5996856183363171,0.1980384309931413,0.6015858724846733,0.5246138430209295,0.6966138312300901,0.272819552458593,0.6973050613903057,0.6886418341777952,0.6631719948368995,0.09852571555507607,0.673195777251188,0.5073560759311939,0.9690232444252442,0.3009852633896299,0.9674185446130952],
    [0.08729724098576302,0.029076537790297206,0.10002900323722641,0.005800620438888524,0.07599087351083475,0.006354885808160438,0.11199034203613698,0.012379166182121456,0.07423690440722099,0.01360832994509996,0.1397626599607076,0.13667867125864308,0.06191146072794465,0.13842277868517272,0.15647995954791258,0.30708136199459324,0.0542186639686793,0.3064852017143683,0.11642669218309092,0.3639656126524154,0.07648885766312609,0.36195641639622117,0.1294340518835197,0.4769195119912557,0.07269184868054641,0.4764658252824837,0.11933184295564823,0.7394847979386376,0.08152710886634772,0.7385874413496263,0.12346626647114436,0.9881106971849598,0.09244248404948137,0.9844448277790873],
    [0.5403964923671449,0.06514153363900291,0.5679493765806723,0.039612132362269604,0.5238933370135853,0.03193810458378029,0.5991957380002394,0.04056214893492629,0.4847477612731233,0.02115922861772832,0.6120953417307582,0.1782058967907241,0.39658420963153945,0.12997593389437956,0.6294450007304006,0.37270244512335315,0.2760042411031657,0.2808346032632218,0.5885912195734528,0.4482089875076897,0.2732927690436038,0.36286648771782865,0.4393484776495991,0.5081109860031218,0.2901008609482234,0.4718630058546187,0.3772154065683869,0.6752779886725432,0.16928077366787211,0.6425089997991871,0.26900035213134754,0.9628045866996409,0.06087791585511874,0.9327445506691867],
    [0.461735005769137,0.0658643228060434,0.48674567044433364,0.036216848217923,0.4344136971209876,0.037536156989411644,0.5317921023076083,0.02702848213046162,0.3867117645808656,0.03074506472236926,0.6021498533464711,0.1313432350712349,0.31873114872303526,0.1360852035763031,0.7432908192052682,0.25251979276678355,0.14060877531980942,0.236578326808535,0.7998069635862348,0.3183048434790471,0.0420451518920686,0.30020346774076795,0.5777728434139039,0.46860713160135753,0.39785723332908013,0.476431075978916,0.6516716554021882,0.6310357302188634,0.3553248582011672,0.6445165327739776,0.6804460756740947,0.9167081043283383,0.36778564440537026,0.9204178796319552],
    [0.11043379349002785,0.041338434518098016,0.1272218479235043,0.012095407104605249,0.08769011319099713,0.018176458290067258,0.16774423387179063,0.00951077851365802,0.06601398053597388,0.025365924198830752,0.24966941290080333,0.1281153054863872,0.05502885063625878,0.16125999529222856,0.33054867498271273,0.2967783844222961,0.04790594587155612,0.34965715687355575,0.3042834645135061,0.3983747623464269,0.08860806120503391,0.43862646920247145,0.29470959132072777,0.4715045180493308,0.16173240532717512,0.49031814719316363,0.34416210301433997,0.6995472354876859,0.2056913794230918,0.7168476546640585,0.3878822751916862,0.9673049769222047,0.25765001324704984,0.9785230579779165],
    [0.1698000266872435,0.07236754157677126,0.18128851296423387,0.03742891320345223,0.13846606090578986,0.048542894315583285,0.20535621112108163,0.027074009837340467,0.10040397427478556,0.05338465208909244,0.28499611171931427,0.13630798452210302,0.09369567177768275,0.20180583921989015,0.41859881703562296,0.2818878598529445,0.11133593276575543,0.4135514568914051,0.4523039639331955,0.35323533045398836,0.19045113935385796,0.47855586958544016,0.43003658323650734,0.4783981922254981,0.29936905847046913,0.5296161086760959,0.5859396989951203,0.6059469632540961,0.44659012857877284,0.6641322125214988,0.7101168671653553,0.9081644161102826,0.6000744471625143,0.9434534187311291]
  ]

  /** The presets that can be added. */
  public static PRESETS = [
    DrawableSkeleton.rawToSkeleton(DrawableSkeleton.PRESETS_RAW[0]),
    DrawableSkeleton.rawToSkeleton(DrawableSkeleton.PRESETS_RAW[1]),
    DrawableSkeleton.rawToSkeleton(DrawableSkeleton.PRESETS_RAW[2]),
    DrawableSkeleton.rawToSkeleton(DrawableSkeleton.PRESETS_RAW[3]),
    DrawableSkeleton.rawToSkeleton(DrawableSkeleton.PRESETS_RAW[4]),
    DrawableSkeleton.rawToSkeleton(DrawableSkeleton.PRESETS_RAW[5]),
    DrawableSkeleton.rawToSkeleton(DrawableSkeleton.PRESETS_RAW[6]),
    DrawableSkeleton.rawToSkeleton(DrawableSkeleton.PRESETS_RAW[7]),
    DrawableSkeleton.rawToSkeleton(DrawableSkeleton.PRESETS_RAW[8]),
    DrawableSkeleton.rawToSkeleton(DrawableSkeleton.PRESETS_RAW[9]),
    DrawableSkeleton.rawToSkeleton(DrawableSkeleton.PRESETS_RAW[10]),
    DrawableSkeleton.rawToSkeleton(DrawableSkeleton.PRESETS_RAW[11]),
    DrawableSkeleton.rawToSkeleton(DrawableSkeleton.PRESETS_RAW[12]),
    DrawableSkeleton.rawToSkeleton(DrawableSkeleton.PRESETS_RAW[13]),
    DrawableSkeleton.rawToSkeleton(DrawableSkeleton.PRESETS_RAW[14]),
    DrawableSkeleton.rawToSkeleton(DrawableSkeleton.PRESETS_RAW[15]),
    DrawableSkeleton.rawToSkeleton(DrawableSkeleton.PRESETS_RAW[16]),
    DrawableSkeleton.rawToSkeleton(DrawableSkeleton.PRESETS_RAW[17]),
    DrawableSkeleton.rawToSkeleton(DrawableSkeleton.PRESETS_RAW[18]),
    DrawableSkeleton.rawToSkeleton(DrawableSkeleton.PRESETS_RAW[19]),
  ]

  /**
   *
   * @param raw
   */
  public static rawToSkeleton(raw: Array<number>) {
    return <Skeleton>{
      nose: {x: raw[0], y: raw[1] , disable: false},
      left_eye: {x: raw[2] , y: raw[3], disable: false},
      right_eye: {x: raw[4] , y: raw[5] , disable: false},
      left_ear: {x: raw[6] , y: raw[7] , disable: false},
      right_ear: {x: raw[8], y: raw[9], disable: false},
      left_shoulder: {x: raw[10], y: raw[11], disable: false},
      right_shoulder: {x: raw[12], y: raw[13], disable: false},
      left_elbow: {x: raw[14], y: raw[15], disable: false},
      right_elbow: {x: raw[16], y: raw[17], disable: false},
      left_wrist: {x: raw[18], y: raw[19], disable: false},
      right_wrist: {x: raw[20], y: raw[21], disable: false},
      left_hip: {x: raw[22], y: raw[23], disable: false},
      right_hip: {x: raw[24], y: raw[25], disable: false},
      left_knee: {x: raw[26], y: raw[27], disable: false},
      right_knee: {x: raw[28], y: raw[29], disable: false},
      left_ankle: {x: raw[30], y: raw[31], disable: false},
      right_ankle: {x: raw[32], y: raw[33], disable: false}
    }
  }

  /** */
  public joints: Array<DrawableJoint>;

  /** Constructor for {@link DrawableSkeleton}. */
  constructor(skeleton: Skeleton = DrawableSkeleton.DEFAULT, scalingFactor = 1.0, visualizeJoint = true) {
    const joints = [
      skeleton.nose, skeleton.left_ear, skeleton.right_ear, skeleton.left_eye, skeleton.right_eye, skeleton.left_shoulder,
      skeleton.right_shoulder, skeleton.left_elbow, skeleton.right_elbow, skeleton.left_wrist, skeleton.right_wrist, skeleton.left_hip,
      skeleton.right_hip, skeleton.left_knee, skeleton.right_knee, skeleton.left_ankle, skeleton.right_ankle
    ]

    /* Prepare elements to add. */
    const drawableJoints = [];
    const elements = []
    for (const joint of joints) {
      const j = new DrawableJoint(joint.x * scalingFactor, joint.y * scalingFactor, visualizeJoint)
      j.disable = joint.disable;
      drawableJoints.push(j)
      elements.push(j);
    }

    /** Add connections. */
    for (const connection of DrawableSkeleton.CONNECTIONS) {
      const path = new Two.Path(connection.map(p => elements[p].position), false, false, true)
      path.linewidth = 2
      if (!path.vertices.every(p => !p.disable)) {
        path.stroke = '#AAAAAA'
      } else {
        path.stroke = '#000000'
      }
      elements.push(path)
    }

    super(elements)
    this.joints = drawableJoints;
  }

  get nose(): DrawableJoint {
      return this.children[0]
  }

  get left_ear(): DrawableJoint {
    return this.children[1]
  }

  get right_ear(): DrawableJoint {
    return this.children[2]
  }

  get left_eye(): DrawableJoint {
    return this.children[3]
  }

  get right_eye(): DrawableJoint {
    return this.children[4]
  }

  get left_shoulder(): DrawableJoint {
    return this.children[5]
  }

  get right_shoulder(): DrawableJoint {
    return this.children[6]
  }

  get left_elbow(): DrawableJoint {
    return this.children[7]
  }

  get right_elbow(): DrawableJoint {
    return this.children[8]
  }

  get left_wrist(): DrawableJoint {
    return this.children[9]
  }

  get right_wrist(): DrawableJoint {
    return this.children[10]
  }

  get left_hip(): DrawableJoint {
    return this.children[11]
  }

  get right_hip(): DrawableJoint {
    return this.children[12]
  }

  get left_knee(): DrawableJoint {
    return this.children[13]
  }

  get right_knee(): DrawableJoint {
    return this.children[14]
  }

  get left_ankle(): DrawableJoint {
    return this.children[15]
  }

  get right_ankle(): DrawableJoint {
    return this.children[16]
  }
}
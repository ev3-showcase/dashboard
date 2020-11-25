export function converLogLine(str: string) {
  let l = str.split(',');
  return {
    original: str,
    datetime: new Date(Number(l[0]) * 1000),
    cpu_stat_processes: Number(l[1]),
    cpu_stat_percent: Number(l[2]),
    mem_stat_total: Number(l[3]),
    mem_stat_used: Number(l[4]),
    ultransonic: Number(l[5]),
    gyro_rate: Number(l[6]),
    gyro_angle: Number(l[7]),
    motor_steering_duty_cylce: Number(l[8]),
    motor_steering_position: Number(l[9]),
    motor_steering_state: Number(l[10]),
    motor_main_l_duty_cycle: Number(l[11]),
    motor_main_l_position: Number(l[12]),
    motor_main_l_state: Number(l[13]),
    motor_main_r_duty_cycle: Number(l[14]),
    motor_main_r_position: Number(l[15]),
    motor_main_r_state: Number(l[16]),
  };
}

export interface LogLine {
  original: string;
  datetime: Date;
  cpu_stat_processes: number;
  cpu_stat_percent: number;
  mem_stat_used: number;
  mem_stat_total: number;
  ultransonic: number;
  gyro_rate: number;
  gyro_angle: number;
  motor_steering_duty_cylce: number;
  motor_steering_position: number;
  motor_steering_state: any;
  motor_main_l_duty_cycle: number;
  motor_main_l_position;
  motor_main_l_state: any;
  motor_main_r_duty_cycle: number;
  motor_main_r_position: number;
  motor_main_r_state: any;
}
